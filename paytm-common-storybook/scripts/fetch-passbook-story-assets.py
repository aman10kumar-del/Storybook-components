#!/usr/bin/env python3
"""
Download PassbookTile story raster exports from Figma MCP asset URLs and write
3× PNGs into src/pods-components/PassbookTile/story-assets/.

Re-run after URLs expire (~7 days): paste fresh URLs from get_design_context.

Usage (from paytm-common-storybook):
  python3 scripts/fetch-passbook-story-assets.py
"""

from __future__ import annotations

import io
import os
import platform
import ssl
import subprocess
import tempfile
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw

# Latest MCP asset URLs (file e58GKvGTgkVs6jputDoINS, 2026-04-10).
ASSETS: list[tuple[str, str, str | None]] = [
    # key, url, mode — "66" = bank mark box; "as_is" = already @3× logical px; None = scale 3×
    (
        "bank-axis",
        "https://www.figma.com/api/mcp/asset/d3237724-6a0a-45e4-93bc-164ba09dfbbe",
        "66",
    ),
    (
        "bank-sbi",
        "https://www.figma.com/api/mcp/asset/d1374e3f-4dca-43b4-945f-466c30d97aa5",
        "66",
    ),
    (
        "bank-icici",
        "https://www.figma.com/api/mcp/asset/ded89ffe-78a8-40e9-bfbb-5fb029cccf1b",
        "66",
    ),
    # Figma exports this ellipse as SVG via MCP; raster matches 20×20 pt @3× (60 px).
    ("graphic-add-circle-blue", "__generated_circle__", "as_is"),
    (
        "graphic-footer-add-bank",
        "https://www.figma.com/api/mcp/asset/80f25868-d875-4cbd-ad53-25da670db3fd",
        None,
    ),
    (
        "graphic-footer-card-stand",
        "https://www.figma.com/api/mcp/asset/4b47556a-c409-4cbb-ab31-bf25f6be9a99",
        None,
    ),
    (
        "graphic-footer-card-face",
        "https://www.figma.com/api/mcp/asset/afcdd11d-aadc-491c-aa66-ffa97129fad2",
        None,
    ),
    (
        "graphic-footer-upi-lite",
        "https://www.figma.com/api/mcp/asset/1f6a08f8-db9b-4484-8c7b-97b72b15c2d9",
        None,
    ),
]

USER_AGENT = "Mozilla/5.0 (compatible; passbook-assets-fetch/1.0)"


def make_add_circle_blue(px: int = 60) -> Image.Image:
    """Solid blue circle for graphic tile leading (aligns with PODS link / primary blue)."""
    im = Image.new("RGBA", (px, px), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    draw.ellipse((0, 0, px - 1, px - 1), fill=(21, 118, 219, 255))
    return im


def fetch_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
        return r.read()


def bytes_to_image(data: bytes) -> Image.Image:
    """PNG/JPEG via Pillow; SVG via macOS ``sips`` (Figma MCP often returns SVG)."""
    if len(data) >= 8 and data[:8] == b"\x89PNG\r\n\x1a\n":
        return Image.open(io.BytesIO(data)).convert("RGBA")
    if len(data) >= 2 and data[:2] == b"\xff\xd8":
        return Image.open(io.BytesIO(data)).convert("RGBA")
    head = data.lstrip()[:200]
    if head.startswith(b"<svg") or head.startswith(b"<?xml"):
        if platform.system() != "Darwin":
            raise RuntimeError(
                "SVG asset from Figma needs rasterizing: run this script on macOS "
                "(uses `sips`) or convert SVGs to PNG manually."
            )
        with tempfile.NamedTemporaryFile(suffix=".svg", delete=False) as f:
            f.write(data)
            svg_path = f.name
        png_path = svg_path + ".png"
        try:
            subprocess.run(
                ["sips", "-s", "format", "png", svg_path, "--out", png_path],
                check=True,
                capture_output=True,
            )
            return Image.open(png_path).convert("RGBA")
        finally:
            for p in (svg_path, png_path):
                try:
                    os.unlink(p)
                except OSError:
                    pass
    return Image.open(io.BytesIO(data)).convert("RGBA")


def fetch_image(url: str) -> Image.Image:
    return bytes_to_image(fetch_bytes(url))


def scale_3x(im: Image.Image) -> Image.Image:
    w, h = im.size
    return im.resize((w * 3, h * 3), Image.Resampling.LANCZOS)


def maybe_scale_3x(im: Image.Image, max_dim_before: int = 220) -> Image.Image:
    """Triple small 1× exports; keep large MCP rasters as-is (already sharp)."""
    if max(im.size) <= max_dim_before:
        return scale_3x(im)
    return im


def fit_bank_mark(im: Image.Image, box: int = 66) -> Image.Image:
    """22×22 pt bank slot @3× → 66 px; preserve aspect, center on transparent canvas."""
    im = im.convert("RGBA")
    w, h = im.size
    m = max(w, h)
    scale = box / m
    nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    canvas.paste(im, ((box - nw) // 2, (box - nh) // 2), im)
    return canvas


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    out_dir = root / "src/pods-components/PassbookTile/story-assets"
    out_dir.mkdir(parents=True, exist_ok=True)

    for key, url, mode in ASSETS:
        if url == "__generated_circle__":
            raw = make_add_circle_blue(60)
        else:
            raw = fetch_image(url)
        if mode == "66":
            out = fit_bank_mark(raw, 66)
        elif mode == "as_is":
            out = raw.convert("RGBA")
        else:
            out = maybe_scale_3x(raw)
        dest = out_dir / f"{key}.png"
        out.save(dest, "PNG", optimize=True)
        print(f"Wrote {dest} ({out.size[0]}×{out.size[1]})")


if __name__ == "__main__":
    main()
