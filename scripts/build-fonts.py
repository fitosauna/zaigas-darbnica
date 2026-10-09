"""
Atjauno pašmitinātos fontus mapē src/fonts/ no Google Fonts oriģināliem (SIL OFL).

  - apakškopa: Latin + Latin Extended-A/B (pilnībā sedz ā č ē ģ ī ķ ļ ņ š ū ž), pieturzīmes, €;
  - Fraunces: SOFT=50, WONK=0 (mierīgās burtu formas), roman wght 300-600, italic wght 400;
  - WONK=0 aizvietojumi tiek „iecepti” cmap tabulā, jo instancer tos citādi pazaudē.

Palaišana:  pip install fonttools brotli  &&  python3 scripts/build-fonts.py
"""
import io
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = Path(__file__).resolve().parent.parent / "src" / "fonts"
BASE = "https://raw.githubusercontent.com/google/fonts/main/ofl/"
UNICODES = "U+0020-007E,U+00A0-00FF,U+0100-024F,U+2010-2027,U+2030-203A,U+2044,U+20AC,U+2122,U+2190-2193,U+2212"

JOBS = [
    ("fraunces/Fraunces%5BSOFT,WONK,opsz,wght%5D.ttf", {"SOFT": 50, "WONK": 0, "wght": (300, 600)}, "fraunces-var.woff2"),
    ("fraunces/Fraunces-Italic%5BSOFT,WONK,opsz,wght%5D.ttf", {"SOFT": 50, "WONK": 0, "wght": 400}, "fraunces-italic-400.woff2"),
    ("mulish/Mulish%5Bwght%5D.ttf", {"wght": (400, 800)}, "mulish-var.woff2"),
    ("caveat/Caveat%5Bwght%5D.ttf", {"wght": 500}, "caveat-500.woff2"),
]


def unicodes():
    out = []
    for part in UNICODES.split(","):
        a, _, b = part.replace("U+", "").partition("-")
        out += range(int(a, 16), int(b or a, 16) + 1)
    return out


def wonk_off_mapping(font):
    """Glifu aizvietojumi, ko fonts lieto pie WONK=0 (FeatureVariations)."""
    if "fvar" not in font or "GSUB" not in font:
        return {}
    gsub = font["GSUB"].table
    if not getattr(gsub, "FeatureVariations", None):
        return {}
    axes = [a.axisTag for a in font["fvar"].axes]
    mapping = {}
    for rec in gsub.FeatureVariations.FeatureVariationRecord:
        if [axes[c.AxisIndex] for c in rec.ConditionSet.ConditionTable] != ["WONK"]:
            continue
        for sr in rec.FeatureTableSubstitution.SubstitutionRecord:
            for li in sr.Feature.LookupListIndex:
                lookup = gsub.LookupList.Lookup[li]
                for st in lookup.SubTable:
                    st = st.ExtSubTable if lookup.LookupType == 7 else st
                    mapping.update(getattr(st, "mapping", {}))
    return mapping


def roundtrip(font):
    buf = io.BytesIO()
    font.save(buf)
    buf.seek(0)
    return TTFont(buf)


for path, limits, name in JOBS:
    data = urllib.request.urlopen(BASE + path).read()
    original = TTFont(io.BytesIO(data))
    mapping = wonk_off_mapping(original) if limits.get("WONK") == 0 else {}
    font = roundtrip(instancer.instantiateVariableFont(original, limits))
    for table in font["cmap"].tables:
        for cp, glyph in list(table.cmap.items()):
            if glyph in mapping:
                table.cmap[cp] = mapping[glyph]
    font = roundtrip(font)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]
    opts.notdef_outline = True
    opts.hinting = False
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=unicodes())
    sub.subset(font)
    font.flavor = "woff2"
    font.save(OUT / name)
    print("OK", name, (OUT / name).stat().st_size // 1024, "KB")
