"""
Ģenerē zīmola failus mapē public/ no oriģinālajiem logo un og-fons.webp:

  - favicon.ico (16/32/48), apple-touch-icon.png (180), icon-192.png, icon-512.png
    no logo „Z” ar diegu un adatas aci (izgriezts no logo, nekas nav pārzīmēts);
  - og-image.jpg (1200x630) - og-fons.webp + pilnais logo + „Zaigas darbnīca Alūksnē”.

Palaišana (vajag Python 3 ar Pillow):  python3 scripts/brand-assets.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
PUBLIC = ROOT / "public"
FONT = ROOT / "src" / "fonts" / "fraunces-var.woff2"

CREAM = (250, 245, 238, 255)
CHOCOLATE = (82, 27, 16, 255)


def z_mark() -> Image.Image:
    """Izgriež „Z” ar diegu no galvenes logo (kreisi no burta „a”)."""
    logo = Image.open(ASSETS / "logo-header-transparent.png").convert("RGBA")
    crop = logo.crop((0, 0, 540, 540))
    w, h = crop.size
    mask = Image.new("L", (w, h), 0)
    px = mask.load()
    for y in range(h):
        for x in range(w):
            if y < 205 and x < 530:  # augšējā svītra un adatas cilpa
                px[x, y] = 255
            elif x < 300:  # diagonāle
                px[x, y] = 255
            elif x < 330:  # maiga pāreja, lai diegs „izzūd”, nevis nogriežas
                px[x, y] = int(255 * (330 - x) / 30)
    # Diega aste apakšā izgaist uz labo pusi.
    for y in range(400, h):
        for x in range(200, 330):
            px[x, y] = min(px[x, y], int(255 * max(0, (330 - x)) / 130))
    alpha = Image.composite(crop.getchannel("A"), Image.new("L", (w, h), 0), mask)
    crop.putalpha(alpha)
    return crop.crop(crop.getbbox())


def tile(mark: Image.Image, size: int, pad: float, radius: float) -> Image.Image:
    """Krēmīgs kvadrāts ar noapaļotiem stūriem un centrētu zīmi."""
    scale = 4
    big = size * scale
    canvas = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    bg = Image.new("RGBA", (big, big), CREAM)
    rmask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(rmask).rounded_rectangle((0, 0, big - 1, big - 1), radius=int(big * radius), fill=255)
    canvas.paste(bg, (0, 0), rmask)
    inner = int(big * (1 - 2 * pad))
    k = inner / max(mark.size)
    m = mark.resize((round(mark.width * k), round(mark.height * k)), Image.LANCZOS)
    canvas.alpha_composite(m, ((big - m.width) // 2, (big - m.height) // 2))
    return canvas.resize((size, size), Image.LANCZOS)


def build_icons() -> None:
    mark = z_mark()
    tile(mark, 48, 0.1, 0.22).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    tile(mark, 32, 0.08, 0.22).save(PUBLIC / "favicon-32.png")
    # iOS pats noapaļo stūrus - pilns kvadrāts.
    tile(mark, 180, 0.16, 0).convert("RGB").save(PUBLIC / "apple-touch-icon.png")
    tile(mark, 192, 0.16, 0.22).save(PUBLIC / "icon-192.png")
    tile(mark, 512, 0.16, 0.22).save(PUBLIC / "icon-512.png")


def build_og() -> None:
    W, H = 1200, 630
    bg = Image.open(ASSETS / "og-fons.webp").convert("RGB")
    bg = ImageOps.fit(bg, (W, H), Image.LANCZOS, centering=(0.5, 0.5)).convert("RGBA")

    # Maigs krēmīgs plīvurs kreisajā pusē, lai teksts lasāms.
    veil = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vpx = veil.load()
    for x in range(W):
        a = int(150 * max(0.0, 1 - x / (W * 0.72)))
        for y in range(H):
            vpx[x, y] = (250, 245, 238, a)
    bg.alpha_composite(veil)

    logo = Image.open(ASSETS / "logo-transparent.png").convert("RGBA")
    logo = logo.crop(logo.getbbox())
    logo.thumbnail((540, 330), Image.LANCZOS)
    left = 92
    top = 92
    bg.alpha_composite(logo, (left, top))

    font = ImageFont.truetype(str(FONT), 58)
    font.set_variation_by_axes([96, 400])
    draw = ImageDraw.Draw(bg)
    text_y = top + logo.height + 34
    draw.text((left + 6, text_y), "Zaigas darbnīca Alūksnē", font=font, fill=CHOCOLATE)

    bg.convert("RGB").save(PUBLIC / "og-image.jpg", quality=86, optimize=True, progressive=True)


if __name__ == "__main__":
    PUBLIC.mkdir(exist_ok=True)
    build_icons()
    build_og()
    print("OK: favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png, og-image.jpg")
