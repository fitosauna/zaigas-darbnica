<?php
/**
 * Kontaktformas (public/send.php) privātie iestatījumi - PARAUGS.
 *
 * Kā lietot SiteGround:
 * 1. Nokopējiet šo failu ar nosaukumu config.php VIENU LĪMENI VIRS public_html, piemēram:
 *      .../zaigasdarbnica.lv/config.php        <- šeit (no pārlūka nav sasniedzams)
 *      .../zaigasdarbnica.lv/public_html/send.php
 *    send.php to meklē ceļā dirname(__DIR__) . '/config.php'.
 * 2. SiteGround Site Tools -> Email -> Accounts izveidojiet kastīti noreply@zaigasdarbnica.lv
 *    un ierakstiet tās paroli laukā smtp_pass. SMTP serveris redzams pie kastītes
 *    („Mail Configuration”), parasti mail.zaigasdarbnica.lv, ports 465 ar SSL.
 * 3. Ierakstiet rate_salt garu nejaušu virkni (piemēram, 40+ burti un cipari).
 *
 * config.php NEKAD neievietojiet Git (tas ir .gitignore) un nelieciet public_html mapē.
 * Ja smtp_host ir tukšs vai config.php nav, send.php sūta ar PHP mail().
 */

return [
    // SMTP serveris, piemēram 'mail.zaigasdarbnica.lv'. Tukšs = PHP mail().
    'smtp_host'   => '',
    // 465 ar 'ssl' vai 587 ar 'tls' (STARTTLS).
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl',
    // SiteGround e-pasta kastīte un tās parole.
    'smtp_user'   => 'noreply@zaigasdarbnica.lv',
    'smtp_pass'   => '',

    // Kam nonāk pieprasījumi un no kādas adreses tie tiek sūtīti.
    'recipient'   => 'zaiga.paula@inbox.lv',
    'from_email'  => 'noreply@zaigasdarbnica.lv',

    // Garš nejaušs teksts IP adrešu sajaukšanai (ierobežojumam 5 ziņas / 10 min).
    'rate_salt'   => '',

    // Neobligāti / optional:
    // Mape ierobežojuma failiem (tikai laika zīmogi). Noklusējums ir servera pagaidu mape;
    // drošāk to turēt blakus šim failam, ārpus public_html:
    // 'rate_dir'    => __DIR__ . '/form-rate-limit',
    // Sūtītāja vārds e-pastā:
    // 'from_name'   => 'Zaigas darbnīca',
];
