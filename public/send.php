<?php
/**
 * Zaigas darbnīca - kontaktformas apstrādātājs (SiteGround: Apache + PHP 8).
 * Contact form handler for /kontakti#forma.
 *
 * Kā tas strādā / how it works:
 * - Forma sūta POST multipart/form-data uz /send.php.
 * - Ar fetch() un galveni "Accept: application/json" atbilde ir JSON:
 *     {"ok":true,"message":"..."}
 *     {"ok":false,"message":"...","errors":{"lauks":"..."}}
 *   Statuss: 200 / 422 (lauki) / 429 (pārāk bieži) / 413 (par lielu) / 405 (nav POST) / 500 (nosūtīšana).
 * - Bez JavaScript (parasts POST): 303 pāradresācija uz /kontakti#paldies vai /kontakti#kluda.
 * - E-pasts iet ar PHPMailer (lib/PHPMailer, v6.12.0, bez Composer; vienā PHPMailer.php
 *   komentārā gara domuzīme aizstāta ar "-"):
 *     ja privātajā config.php ir aizpildīts smtp_host - caur autentificētu SMTP,
 *     ja smtp_host ir tukšs vai config.php nav - caur PHP mail().
 * - Privātais config.php atrodas VIENU LĪMENI VIRS public_html (paraugs: config.example.php
 *   repozitorija saknē). Paroles nekad nenonāk Git.
 *
 * Drošība / security:
 * - vienas rindas laukiem izmet CR/LF un vadības rakstzīmes (galvenēs nevar ievietot jaunas rindas);
 * - tēma veidota tikai no pakalpojuma nosaukuma no saraksta, Reply-To tikai derīgai adresei;
 * - pieprasījuma izmēra ierobežojums, foto tips pēc satura (finfo), nevis pēc paplašinājuma;
 * - foto pievieno tieši no PHP pagaidu faila ar ģenerētu nosaukumu, nekur neglabā, beigās izdzēš;
 * - honeypot lauks "vietne", ierobežojums pēc IP (failā tikai laika zīmogi, IP ir sajaukts ar sāli);
 * - žurnālā (error_log) tikai vispārīgas rindas bez personas datiem; apmeklētājam e-pastu nesūta.
 */

declare(strict_types=1);

/* ==========================================================================
 * CONFIG - visi iestatījumi vienuviet / all settings in one place.
 * Ko var pārrakstīt privātajā config.php: skat. $PRIVATE_KEYS zemāk.
 * ========================================================================== */
$CONFIG = [
    // Kam nonāk pieprasījumi (Zaigas e-pasts).
    'recipient'         => 'zaiga.paula@inbox.lv',
    // Sūtītājs: SiteGround izveidota e-pasta kastīte šajā domēnā.
    'from_email'        => 'noreply@zaigasdarbnica.lv',
    'from_name'         => 'Zaigas darbnīca',

    // Privātais iestatījumu fails ar SMTP paroli: VIENU LĪMENI VIRS public_html.
    'private_config'    => dirname(__DIR__) . '/config.php',

    // SMTP - aizpilda tikai config.php. Tukšs smtp_host = sūtīt ar PHP mail().
    'smtp_host'         => '',
    'smtp_port'         => 465,
    'smtp_secure'       => 'ssl',   // 'ssl' (parasti ports 465) vai 'tls' (STARTTLS, ports 587)
    'smtp_user'         => '',
    'smtp_pass'         => '',
    'smtp_timeout'      => 15,      // sekundes

    // Ierobežojumi / limits.
    'max_upload_bytes'  => 10 * 1024 * 1024,   // foto līdz 10 MB
    'max_request_bytes' => 12 * 1024 * 1024,   // viss pieprasījums līdz ~12 MB
    'rate_limit_max'    => 5,                  // ne vairāk kā 5 ziņas ...
    'rate_limit_window' => 10 * 60,            // ... 10 minūtēs no vienas IP adreses
    // Mape ierobežojuma failiem (tikai laika zīmogi). Tai nav jābūt publiskai.
    'rate_dir'          => sys_get_temp_dir() . '/zaigasdarbnica-form',
    // Sāls IP sajaukšanai. config.php ierakstiet garu nejaušu virkni.
    // Ja tukšs, sāls tiek automātiski izveidots failā rate_dir/.salt.
    'rate_salt'         => '',

    // Kur pāradresēt, ja forma nosūtīta bez JavaScript.
    'redirect_ok'       => '/kontakti#paldies',
    'redirect_error'    => '/kontakti#kluda',
];

// Atslēgas, kuras drīkst pārrakstīt privātais config.php.
$PRIVATE_KEYS = [
    'smtp_host', 'smtp_port', 'smtp_secure', 'smtp_user', 'smtp_pass',
    'recipient', 'from_email', 'from_name', 'rate_salt', 'rate_dir',
];

// Teksti: Part B §9.6 + kļūdas e-pastam un foto. Uzruna vienmēr ar „Jūs”.
const MSG_SUCCESS       = 'Paldies! Jūsu ziņa ir saņemta. Atbildēšu, cik drīz vien varēšu.';
const MSG_ERROR         = 'Ziņu neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz vai piezvaniet uz +371 26 423 325.';
const MSG_VARDS         = 'Lūdzu, ierakstiet savu vārdu.';
const MSG_TALRUNIS      = 'Lūdzu, ierakstiet tālruņa numuru.';
const MSG_APRAKSTS      = 'Lūdzu, īsi aprakstiet, kas jādara.';
const MSG_PIEKRISANA    = 'Lūdzu, apstipriniet piekrišanu.';
const MSG_EPASTS        = 'Lūdzu, pārbaudiet e-pasta adresi.';
const MSG_FOTO_SIZE     = 'Foto ir par lielu. Lūdzu, pievienojiet failu līdz 10 MB.';
const MSG_FOTO_TYPE     = 'Lūdzu, pievienojiet foto JPG, PNG, WebP vai HEIC formātā.';

// Izvēlņu vērtības (formas value => nosaukums e-pastā). Nezināms pakalpojums = „Cits”.
const SERVICES = [
    'remonts'     => 'Apģērbu remonts',
    'pielagosana' => 'Pielāgošana un pāršūšana',
    'susana'      => 'Individuālā šūšana',
    'adisana'     => 'Adīšana pēc pasūtījuma',
    'aizkari'     => 'Aizkari un mājas tekstils',
    'logi'        => 'Logu nomērīšana',
    'cits'        => 'Cits',
];
const PLACES = [
    'aluksne' => 'Alūksne',
    'gulbene' => 'Gulbene',
    'balvi'   => 'Balvi',
    'cita'    => 'Cita vieta',
];

// Lauku garuma ierobežojumi (rakstzīmēs).
const MAX_VARDS    = 100;
const MAX_TALRUNIS = 40;
const MAX_EPASTS   = 150;
const MAX_APRAKSTS = 3000;
const MAX_TERMINS  = 200;

/* ==========================================================================
 * Turpmāk nekas nav jāmaina / nothing to edit below this line.
 * ========================================================================== */

// Brīdinājumus apmeklētājam nekad nerāda (tie varētu sabojāt JSON vai atklāt ceļus).
ini_set('display_errors', '0');
// PHP starta brīdinājumi (piem. „POST Content-Length ... exceeds the limit”), kas jau ir izvades
// buferī, tiek izmesti. Ja output_buffering ir izslēgts, tos var apturēt tikai servera
// iestatījums display_errors = Off.
while (ob_get_level() > 0 && @ob_end_clean()) {
    // tukšs
}
header_remove('X-Powered-By');
date_default_timezone_set('Europe/Riga');
// Ja apmeklētājs aizver lapu sūtīšanas laikā, ziņu tik un tā nosūta līdz galam.
ignore_user_abort(true);

// Jebkurā gadījumā beigās izdzēš PHP pagaidu failus (foto nekur netiek glabāts).
register_shutdown_function(static function (): void {
    foreach ($_FILES as $file) {
        foreach ((array) ($file['tmp_name'] ?? []) as $tmp) {
            if (is_string($tmp) && $tmp !== '' && is_uploaded_file($tmp)) {
                @unlink($tmp);
            }
        }
    }
});

// Fatāla kļūda (piem. pietrūkst memory_limit lielam foto vai beidzas max_execution_time):
// apmeklētājs tik un tā saņem parasto kļūdas ziņu (JSON 500 vai pāradresāciju), nevis tukšu lapu.
register_shutdown_function(static function () use ($CONFIG): void {
    $last = error_get_last();
    $fatal = [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR, E_RECOVERABLE_ERROR];
    if ($last !== null && in_array($last['type'], $fatal, true) && !headers_sent()) {
        while (ob_get_level() > 0 && @ob_end_clean()) {
            // tukšs
        }
        respond($CONFIG, 500, false, MSG_ERROR);
    }
});

try {
    load_private_config($CONFIG, $PRIVATE_KEYS);
    handle_request($CONFIG);
} catch (\Throwable $e) {
    // Žurnālā tikai kļūdas klase un rinda, bez ievadītajiem datiem.
    error_log('send.php: unexpected ' . get_class($e) . ' on line ' . $e->getLine());
    respond($CONFIG, 500, false, MSG_ERROR);
}

/* ==========================================================================
 * Galvenā plūsma / main flow
 * ========================================================================== */

function handle_request(array $c): void
{
    // 1. Tikai POST.
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        respond($c, 405, false, MSG_ERROR);
    }

    // 2. Pieprasījuma izmērs: mūsu robeža un gadījums, kad PHP pats izmeta POST (post_max_size).
    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    $postMax = ini_bytes((string) ini_get('post_max_size'));
    if ($contentLength > (int) $c['max_request_bytes'] || ($postMax > 0 && $contentLength > $postMax)) {
        respond($c, 413, false, MSG_ERROR, ['foto' => MSG_FOTO_SIZE]);
    }

    // 3. Pārāk daudz ziņu no šīs IP adreses?
    if (!rate_limit($c, false)) {
        header('Retry-After: ' . (int) $c['rate_limit_window']);
        respond($c, 429, false, MSG_ERROR);
    }

    // 4. Honeypot: robotam atbild kā parasti, bet neko nesūta.
    $honeypot = $_POST['vietne'] ?? '';
    if (is_array($honeypot) || trim((string) $honeypot) !== '') {
        rate_limit($c, true);
        respond($c, 200, true, MSG_SUCCESS);
    }

    // 5. Lauku pārbaude.
    $errors = [];

    $vards = clean_line(post_string('vards'));
    if ($vards === '' || str_len($vards) > MAX_VARDS) {
        $errors['vards'] = MSG_VARDS;
    }

    $talrunis = clean_line(post_string('talrunis'));
    if (
        $talrunis === ''
        || str_len($talrunis) > MAX_TALRUNIS
        || preg_match('/^[0-9 +()\-.\/]+$/', $talrunis) !== 1
        || preg_match_all('/[0-9]/', $talrunis) < 6
    ) {
        $errors['talrunis'] = MSG_TALRUNIS;
    }

    $epasts = clean_line(post_string('epasts'));
    if ($epasts !== '' && (str_len($epasts) > MAX_EPASTS || filter_var($epasts, FILTER_VALIDATE_EMAIL) === false)) {
        $errors['epasts'] = MSG_EPASTS;
    }

    $pakalpojums = SERVICES[clean_line(post_string('pakalpojums'))] ?? SERVICES['cits'];
    $vieta = PLACES[clean_line(post_string('vieta'))] ?? '';

    $apraksts = clean_text(post_string('apraksts'));
    if ($apraksts === '' || str_len($apraksts) > MAX_APRAKSTS) {
        $errors['apraksts'] = MSG_APRAKSTS;
    }

    $termins = str_cut(clean_line(post_string('termins')), MAX_TERMINS);

    if (trim(post_string('piekrisana')) !== '1') {
        $errors['piekrisana'] = MSG_PIEKRISANA;
    }

    // 6. Foto (nav obligāts).
    $photo = null;
    $upload = check_upload($c, $photo);
    if ($upload === 'server') {
        respond($c, 500, false, MSG_ERROR);
    }
    if ($upload !== null && $upload !== 'partial') {
        $errors['foto'] = $upload;
    }

    if ($errors !== [] || $upload === 'partial') {
        respond($c, 422, false, MSG_ERROR, $errors);
    }

    // 7. Ierobežojumu pieskaita tikai derīgai ziņai (atomāri, ar atkārtotu pārbaudi).
    if (!rate_limit($c, true)) {
        header('Retry-After: ' . (int) $c['rate_limit_window']);
        respond($c, 429, false, MSG_ERROR);
    }

    // 8. E-pasts Zaigai (vienkāršs teksts, UTF-8).
    $body = implode("\n", [
        'Vārds: ' . $vards,
        'Tālrunis: ' . $talrunis,
        'E-pasts: ' . ($epasts !== '' ? $epasts : '-'),
        'Pakalpojums: ' . $pakalpojums,
        'No kurienes: ' . ($vieta !== '' ? $vieta : '-'),
        '',
        'Kas jādara:',
        $apraksts,
        '',
        'Kad vajadzīgs: ' . ($termins !== '' ? $termins : '-'),
        'Foto pievienots: ' . ($photo !== null ? 'jā' : 'nē'),
        '',
        'Nosūtīts: ' . date('d.m.Y H:i'),
    ]) . "\n";

    $subject = 'Jauns pieprasījums no mājaslapas: ' . $pakalpojums;
    $replyTo = $epasts !== '' ? $epasts : '';

    if (!send_mail($c, $subject, $body, $replyTo, $vards, $photo)) {
        respond($c, 500, false, MSG_ERROR);
    }

    respond($c, 200, true, MSG_SUCCESS);
}

/* ==========================================================================
 * Atbilde / response
 * ========================================================================== */

/**
 * Atbild ar JSON (fetch) vai pāradresē (parasts POST) un beidz darbu.
 *
 * @param array<string,string> $errors
 */
function respond(array $c, int $status, bool $ok, string $message, array $errors = []): void
{
    header('Cache-Control: no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    header('X-Robots-Tag: noindex, nofollow');
    if ($status === 405) {
        header('Allow: POST');
    }

    if (wants_json()) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        $payload = ['ok' => $ok, 'message' => $message];
        if (!$ok) {
            $payload['errors'] = (object) $errors;
        }
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    if ($status === 405) {
        http_response_code(405);
        header('Content-Type: text/plain; charset=utf-8');
        echo "405 Method Not Allowed\n";
        exit;
    }

    // Bez JavaScript: 303 uz pateicības vai kļūdas stāvokli kontaktu lapā.
    header('Location: ' . ($ok ? (string) $c['redirect_ok'] : (string) $c['redirect_error']), true, 303);
    exit;
}

function wants_json(): bool
{
    return stripos((string) ($_SERVER['HTTP_ACCEPT'] ?? ''), 'application/json') !== false;
}

/* ==========================================================================
 * Privātais config.php
 * ========================================================================== */

/**
 * @param array<string,mixed> $config
 * @param list<string>        $allowedKeys
 */
function load_private_config(array &$config, array $allowedKeys): void
{
    $file = (string) $config['private_config'];
    if ($file === '' || !@is_file($file)) {
        return; // Nav config.php - sūta ar mail().
    }

    ob_start(); // Ja config.php nejauši kaut ko izvada, tas nesabojā atbildi.
    try {
        $private = (static function (string $path) {
            return include $path;
        })($file);
    } catch (\Throwable $e) {
        $private = null;
    }
    ob_end_clean();

    if (!is_array($private)) {
        error_log('send.php: config.php could not be loaded or does not return an array');
        return;
    }
    foreach ($allowedKeys as $key) {
        if (array_key_exists($key, $private) && is_scalar($private[$key])) {
            $config[$key] = $private[$key];
        }
    }
}

/* ==========================================================================
 * Lauku tīrīšana / input cleaning
 * ========================================================================== */

/** POST lauks kā virkne; masīvs vai nederīgs UTF-8 kļūst par tukšu virkni. */
function post_string(string $name): string
{
    $value = $_POST[$name] ?? '';
    if (!is_string($value)) {
        return '';
    }
    if ($value !== '' && preg_match('//u', $value) !== 1) {
        return '';
    }
    return $value;
}

/** Vienas rindas lauks: bez CR/LF, tabulācijām, vadības un neredzamām rakstzīmēm. */
function clean_line(string $value): string
{
    // Neredzamās un virziena rakstzīmes izmet pavisam.
    $value = (string) preg_replace('/[\x{200B}-\x{200D}\x{202A}-\x{202E}\x{2066}-\x{2069}\x{FEFF}]/u', '', $value);
    // CR, LF, citas vadības rakstzīmes un īpašās atstarpes kļūst par parastu atstarpi.
    $value = (string) preg_replace('/[\x00-\x1F\x7F\x{0080}-\x{009F}\x{00A0}\x{2028}\x{2029}\x{202F}]/u', ' ', $value);
    $value = (string) preg_replace('/ {2,}/', ' ', $value);
    return trim($value);
}

/** Vairāku rindu teksts: rindas saglabā, vadības rakstzīmes izmet. */
function clean_text(string $value): string
{
    $value = str_replace(["\r\n", "\r", "\u{2028}", "\u{2029}", "\u{0085}"], "\n", $value);
    $value = str_replace(["\t", "\u{00A0}", "\u{202F}"], ' ', $value);
    $value = (string) preg_replace(
        '/[\x00-\x09\x0B-\x1F\x7F\x{0080}-\x{009F}\x{200B}-\x{200D}\x{202A}-\x{202E}\x{2066}-\x{2069}\x{FEFF}]/u',
        '',
        $value
    );
    $value = (string) preg_replace('/[ ]+$/m', '', $value);
    $value = (string) preg_replace("/\n{3,}/", "\n\n", $value);
    return trim($value);
}

function str_len(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }
    return (int) preg_match_all('/./su', $value);
}

function str_cut(string $value, int $max): string
{
    if (str_len($value) <= $max) {
        return $value;
    }
    if (function_exists('mb_substr')) {
        return rtrim(mb_substr($value, 0, $max, 'UTF-8'));
    }
    return preg_match('/^.{0,' . $max . '}/su', $value, $m) === 1 ? rtrim($m[0]) : '';
}

/** php.ini izmērs („8M”, „128M”, „1G”) baitos. 0 = bez ierobežojuma. */
function ini_bytes(string $value): int
{
    $value = trim($value);
    if ($value === '') {
        return 0;
    }
    $number = (int) $value;
    switch (strtolower(substr($value, -1))) {
        case 'g':
            $number *= 1024;
            // turpinās
        case 'm':
            $number *= 1024;
            // turpinās
        case 'k':
            $number *= 1024;
    }
    return $number;
}

/* ==========================================================================
 * Foto augšupielāde / photo upload
 * ========================================================================== */

/**
 * Pārbauda lauku "foto". Atgriež:
 *   null       - foto nav vai tas ir derīgs ($photo aizpildīts);
 *   'partial'  - augšupielāde pārtrūka (vispārīga kļūda);
 *   'server'   - servera kļūme (pagaidu mape u.tml.);
 *   virkne     - kļūdas teksts laukam "foto".
 *
 * @param array{path:string,name:string,mime:string}|null $photo
 */
function check_upload(array $c, ?array &$photo): ?string
{
    $photo = null;
    if (!isset($_FILES['foto']) || !is_array($_FILES['foto'])) {
        return null;
    }
    $file = $_FILES['foto'];
    $error = $file['error'] ?? UPLOAD_ERR_NO_FILE;

    if (!is_int($error)) {
        return MSG_FOTO_TYPE; // Vairāki faili vienā laukā - nav paredzēts.
    }
    switch ($error) {
        case UPLOAD_ERR_NO_FILE:
            return null;
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            return MSG_FOTO_SIZE;
        case UPLOAD_ERR_PARTIAL:
            return 'partial';
        default: // UPLOAD_ERR_NO_TMP_DIR, UPLOAD_ERR_CANT_WRITE, UPLOAD_ERR_EXTENSION
            error_log('send.php: upload failed on the server (code ' . $error . ')');
            return 'server';
    }

    $tmp = (string) ($file['tmp_name'] ?? '');
    if ($tmp === '' || !is_uploaded_file($tmp)) {
        return MSG_FOTO_TYPE;
    }
    $size = @filesize($tmp);
    if ($size === false || $size <= 0) {
        return MSG_FOTO_TYPE;
    }
    if ($size > (int) $c['max_upload_bytes']) {
        return MSG_FOTO_SIZE;
    }

    $mime = detect_image_type($tmp);
    if ($mime === null) {
        return MSG_FOTO_TYPE;
    }

    $extensions = [
        'image/jpeg'          => 'jpg',
        'image/png'           => 'png',
        'image/webp'          => 'webp',
        'image/heic'          => 'heic',
        'image/heic-sequence' => 'heic',
        'image/heif'          => 'heif',
        'image/heif-sequence' => 'heif',
    ];
    $photo = [
        'path' => $tmp,
        'name' => 'foto-' . date('Ymd-His') . '.' . $extensions[$mime],
        'mime' => $mime,
    ];
    return null;
}

/** Īstais attēla tips pēc satura (finfo). Atgriež MIME vai null, ja tips nav atļauts. */
function detect_image_type(string $path): ?string
{
    $allowed = [
        'image/jpeg', 'image/png', 'image/webp',
        'image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence',
    ];
    if (!class_exists('finfo')) {
        error_log('send.php: fileinfo extension is missing, photo rejected');
        return null;
    }
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($path);
    $mime = is_string($mime) ? strtolower($mime) : '';
    if (in_array($mime, $allowed, true)) {
        return $mime;
    }

    // Vecāka libmagic HEIC/HEIF atpazīst kā application/octet-stream:
    // tad pārbauda ISO-BMFF "ftyp" bloku (baiti 4-7) un galveno zīmolu (baiti 8-11).
    if ($mime === 'application/octet-stream') {
        $head = (string) @file_get_contents($path, false, null, 0, 12);
        if (strlen($head) === 12 && substr($head, 4, 4) === 'ftyp') {
            $brand = substr($head, 8, 4);
            if (in_array($brand, ['heic', 'heix', 'hevc', 'heim', 'heis'], true)) {
                return 'image/heic';
            }
            if (in_array($brand, ['mif1', 'msf1'], true)) {
                return 'image/heif';
            }
        }
    }
    return null;
}

/* ==========================================================================
 * Ierobežojums pēc IP / rate limit
 * ========================================================================== */

/**
 * Pārbauda (un, ja $record, pieskaita) ziņas no šīs IP adreses pēdējās N minūtēs.
 * Fails ir nosaukts pēc sha256(IP vai IPv6 /64 tīkls + sāls) un satur tikai laika zīmogus.
 * Ja mape nav pieejama, forma turpina strādāt (labāk saņemt ziņu nekā bloķēt visus).
 */
function rate_limit(array $c, bool $record): bool
{
    $dir = rtrim((string) $c['rate_dir'], '/\\');
    $max = (int) $c['rate_limit_max'];
    $window = (int) $c['rate_limit_window'];
    if ($dir === '' || $max <= 0 || $window <= 0) {
        return true;
    }
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        error_log('send.php: rate-limit directory is not available');
        return true;
    }

    $salt = (string) $c['rate_salt'];
    if ($salt === '') {
        $salt = rate_auto_salt($dir);
    }
    $file = $dir . '/' . hash('sha256', rate_client_key() . $salt);
    if (!$record && !is_file($file)) {
        return true; // Šai IP vēl nav neviena ieraksta - neko neveido.
    }

    $handle = @fopen($file, $record ? 'c+' : 'r');
    if ($handle === false) {
        error_log('send.php: rate-limit file is not writable');
        return true;
    }
    if ($record) {
        @chmod($file, 0600);
    }

    $allowed = true;
    if (flock($handle, $record ? LOCK_EX : LOCK_SH)) {
        $now = time();
        $times = [];
        foreach (preg_split('/\s+/', (string) stream_get_contents($handle), -1, PREG_SPLIT_NO_EMPTY) ?: [] as $stamp) {
            if (preg_match('/^\d{1,12}$/', $stamp) === 1 && (int) $stamp > $now - $window) {
                $times[] = (int) $stamp;
            }
        }
        $allowed = count($times) < $max;
        // Raksta tikai, pieskaitot ziņu. Pārbaude failu nemaina, tāpēc vecs fails (mtime)
        // tiek izdzēsts pēc 10 minūtēm un nekas netiek glabāts ilgāk par vajadzīgo.
        if ($allowed && $record) {
            $times[] = $now;
            ftruncate($handle, 0);
            rewind($handle);
            fwrite($handle, implode("\n", $times));
            fflush($handle);
        }
        flock($handle, LOCK_UN);
    }
    fclose($handle);

    // Izdzēš visus failus, kuros pēdējās 10 minūtēs nekas nav rakstīts.
    if ($record) {
        rate_cleanup($dir, $window);
    }
    return $allowed;
}

/**
 * Apmeklētāja atslēga ierobežojumam: IPv4 adrese vai IPv6 /64 tīkls (vienam pieslēgumam
 * parasti pieder viss /64, tāpēc adreses maiņa tajā neapiet ierobežojumu).
 * X-Forwarded-For netiek izmantots - to var viltot.
 */
function rate_client_key(): string
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) !== false) {
        $packed = @inet_pton($ip);
        if (is_string($packed) && strlen($packed) === 16) {
            // IPv4-mapped (::ffff:1.2.3.4) paliek kā IPv4.
            if (substr($packed, 0, 12) === str_repeat("\0", 10) . "\xFF\xFF") {
                return (string) inet_ntop(substr($packed, 12));
            }
            return 'v6:' . bin2hex(substr($packed, 0, 8));
        }
    }
    return $ip;
}

function rate_auto_salt(string $dir): string
{
    $file = $dir . '/.salt';
    $salt = @file_get_contents($file);
    if (is_string($salt) && strlen(trim($salt)) >= 32) {
        return trim($salt);
    }
    $new = bin2hex(random_bytes(32));
    $handle = @fopen($file, 'x');
    if ($handle !== false) {
        fwrite($handle, $new);
        fclose($handle);
        @chmod($file, 0600);
        return $new;
    }
    $salt = @file_get_contents($file);
    return is_string($salt) && strlen(trim($salt)) >= 32 ? trim($salt) : $new;
}

function rate_cleanup(string $dir, int $window): void
{
    $entries = @scandir($dir);
    if ($entries === false) {
        return;
    }
    $limit = time() - $window;
    foreach ($entries as $name) {
        if (preg_match('/^[0-9a-f]{64}$/', $name) !== 1) {
            continue;
        }
        $path = $dir . '/' . $name;
        $mtime = @filemtime($path);
        if ($mtime !== false && $mtime < $limit) {
            @unlink($path);
        }
    }
}

/* ==========================================================================
 * Sūtīšana / sending (PHPMailer)
 * ========================================================================== */

/**
 * @param array{path:string,name:string,mime:string}|null $photo
 */
function send_mail(array $c, string $subject, string $body, string $replyTo, string $replyName, ?array $photo): bool
{
    $recipient = trim((string) $c['recipient']);
    $from = trim((string) $c['from_email']);
    if (filter_var($recipient, FILTER_VALIDATE_EMAIL) === false || filter_var($from, FILTER_VALIDATE_EMAIL) === false) {
        error_log('send.php: recipient or from_email is not a valid address');
        return false;
    }

    $lib = __DIR__ . '/lib/PHPMailer/src/';
    foreach (['Exception.php', 'PHPMailer.php', 'SMTP.php'] as $part) {
        if (!is_file($lib . $part)) {
            error_log('send.php: PHPMailer library is missing');
            return false;
        }
        require_once $lib . $part;
    }

    $useSmtp = trim((string) $c['smtp_host']) !== '';
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

    try {
        $mail->CharSet = \PHPMailer\PHPMailer\PHPMailer::CHARSET_UTF8;
        $mail->XMailer = ' '; // Bez X-Mailer galvenes.
        $mail->Hostname = substr($from, strrpos($from, '@') + 1);

        if ($useSmtp) {
            $mail->isSMTP();
            $mail->Host = trim((string) $c['smtp_host']);
            $mail->Port = (int) $c['smtp_port'];
            $mail->Timeout = (int) $c['smtp_timeout'];
            $mail->SMTPDebug = 0;
            $user = (string) $c['smtp_user'];
            $mail->SMTPAuth = $user !== '';
            $mail->Username = $user;
            $mail->Password = (string) $c['smtp_pass'];
            $secure = strtolower(trim((string) $c['smtp_secure']));
            if ($secure === 'ssl') {
                $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
            } elseif ($secure === 'tls') {
                $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            }
        } else {
            $mail->isMail();
        }

        $mail->setFrom($from, (string) $c['from_name']);
        $mail->addAddress($recipient);
        if ($replyTo !== '') {
            $mail->addReplyTo($replyTo, $replyName);
        }
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body = $body;

        if ($photo !== null) {
            $mail->addAttachment(
                $photo['path'],
                $photo['name'],
                \PHPMailer\PHPMailer\PHPMailer::ENCODING_BASE64,
                $photo['mime']
            );
        }

        $mail->send();
        return true;
    } catch (\Throwable $e) {
        // Žurnālā tikai vispārīgs iemesls, bez adresēm un satura.
        error_log('send.php: ' . ($useSmtp ? 'SMTP' : 'mail()') . ' send failed (' . failure_kind($mail->ErrorInfo) . ')');
        return false;
    } finally {
        if ($useSmtp) {
            $mail->smtpClose();
        }
    }
}

/** Kļūdas veids žurnālam bez personas datiem. */
function failure_kind(string $info): string
{
    $info = strtolower($info);
    if (strpos($info, 'authenticate') !== false) {
        return 'auth';
    }
    if (strpos($info, 'connect') !== false) {
        return 'connect';
    }
    if (strpos($info, 'instantiate mail') !== false) {
        return 'mail function';
    }
    if (strpos($info, 'recipient') !== false || strpos($info, 'from address') !== false) {
        return 'address rejected';
    }
    if (strpos($info, 'file') !== false) {
        return 'attachment';
    }
    return 'other';
}
