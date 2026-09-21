"""Cut the POS terminal from machine.jpeg onto a transparent PNG.

Source of truth remains the photograph — this only removes the studio backdrop.
"""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "machine.jpeg"
DST = ROOT / "public" / "machine.png"


def is_backdrop(r: int, g: int, b: int) -> bool:
    luma = (r * 0.299 + g * 0.587 + b * 0.114) / 255.0
    chroma = (max(r, g, b) - min(r, g, b)) / 255.0
    return luma > 0.78 and chroma < 0.14


def main() -> None:
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    px = im.load()
    assert px is not None

    visited = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        i = y * w + x
        if visited[i]:
            continue
        visited[i] = 1
        r, g, b, _a = px[x, y]
        if not is_backdrop(r, g, b):
            continue
        px[x, y] = (0, 0, 0, 0)
        q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    # Second pass: eat the photo's contact shadow (neutral, still fairly light).
    shadow_q: deque[tuple[int, int]] = deque()
    for y in range(h):
        for x in range(w):
            if px[x, y][3] == 0:
                shadow_q.append((x, y))
    seen_shadow = bytearray(w * h)
    while shadow_q:
        x, y = shadow_q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h:
                continue
            si = ny * w + nx
            if seen_shadow[si]:
                continue
            seen_shadow[si] = 1
            r, g, b, a = px[nx, ny]
            if a == 0:
                continue
            luma = (r * 0.299 + g * 0.587 + b * 0.114) / 255.0
            chroma = (max(r, g, b) - min(r, g, b)) / 255.0
            left_shadow = nx < w * 0.52 and luma > 0.5 and chroma < 0.13
            light_fringe = luma > 0.8 and chroma < 0.1
            if left_shadow or light_fringe:
                px[nx, ny] = (0, 0, 0, 0)
                shadow_q.append((nx, ny))

    # Feather fringe: any remaining near-white pixel next to transparency
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if not is_backdrop(r, g, b):
                continue
            neighbor_clear = False
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                    neighbor_clear = True
                    break
            if neighbor_clear:
                px[x, y] = (r, g, b, 0)

    bbox = im.getbbox()
    if bbox:
        pad = 18
        l, t, r, b = bbox
        im = im.crop((max(0, l - pad), max(0, t - pad), min(w, r + pad), min(h, b + pad)))

    im.save(DST, "PNG")
    print(f"wrote {DST} {im.size}")


if __name__ == "__main__":
    main()
