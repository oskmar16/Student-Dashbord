from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

OUT = Path(__file__).parent
SIZE = 1024

image = Image.new("RGB", (SIZE, SIZE))
pixels = image.load()
start = (102, 103, 227)
end = (233, 105, 135)

for y in range(SIZE):
    for x in range(SIZE):
        t = min(1, max(0, (x + y) / (SIZE * 2)))
        base = tuple(int(start[i] * (1 - t) + end[i] * t) for i in range(3))
        glow_distance = ((x - 800) ** 2 + (y - 180) ** 2) ** 0.5
        glow = max(0, 1 - glow_distance / 560) * 0.17
        pixels[x, y] = tuple(int(channel + (255 - channel) * glow) for channel in base)

shade = Image.new("RGBA", image.size, (0, 0, 0, 0))
shade_draw = ImageDraw.Draw(shade)
shade_draw.ellipse((-160, 710, 410, 1280), fill=(40, 42, 130, 35))
image = Image.alpha_composite(image.convert("RGBA"), shade)

points = [(264, 716), (264, 308), (512, 572), (760, 308), (760, 716)]
shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
shadow_draw = ImageDraw.Draw(shadow)
shadow_points = [(x, y + 25) for x, y in points]
shadow_draw.line(shadow_points, fill=(35, 35, 105, 90), width=96, joint="curve")
for x, y in shadow_points:
    shadow_draw.ellipse((x - 48, y - 48, x + 48, y + 48), fill=(35, 35, 105, 90))
shadow = shadow.filter(ImageFilter.GaussianBlur(20))
image = Image.alpha_composite(image, shadow)

draw = ImageDraw.Draw(image)
draw.line(points, fill="white", width=92, joint="curve")
for x, y in points:
    draw.ellipse((x - 46, y - 46, x + 46, y + 46), fill="white")

for size in (192, 512):
    resized = image.resize((size, size), Image.Resampling.LANCZOS).convert("RGB")
    resized.save(OUT / f"icon-{size}.png", optimize=True)
