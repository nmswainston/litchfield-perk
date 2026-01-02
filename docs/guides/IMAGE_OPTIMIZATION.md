# Image Optimization Instructions

## Required Image Sizes

### Logo Images

- **logo-512-mobile.webp**: 256x256px (WebP)
- **logo-512-mobile.png**: 256x256px (PNG fallback)
- **logo-512-desktop.webp**: 512x512px (WebP)
- **logo-512-desktop.png**: 512x512px (PNG fallback)

- **logo-1024-mobile.webp**: 512x512px (WebP)
- **logo-1024-mobile.png**: 512x512px (PNG fallback)
- **logo-1024-desktop.webp**: 1024x1024px (WebP)
- **logo-1024-desktop.png**: 1024x1024px (PNG fallback)

### Background Patterns

- **botanical-pattern-mobile.webp**: 400x200px (WebP)
- **botanical-pattern-mobile.png**: 400x200px (PNG fallback)
- **botanical-pattern-desktop.webp**: 800x400px (WebP)
- **botanical-pattern-desktop.png**: 800x400px (PNG fallback)

- **seamless-background-mobile.webp**: 400x400px (WebP)
- **seamless-background-mobile.png**: 400x400px (PNG fallback)
- **seamless-background-desktop.webp**: 800x800px (WebP)
- **seamless-background-desktop.png**: 800x800px (PNG fallback)

## Tools for Optimization

### Online Tools

1. **Squoosh.app** - Google's image optimization tool
2. **TinyPNG** - PNG/WebP compression
3. **ImageOptim** - Mac app for optimization

### Command Line Tools

1. **Sharp** (Node.js): npm install -g sharp-cli
2. **ImageMagick**: convert input.png -resize 400x200 output.webp
3. **cwebp**: cwebp -q 80 input.png -o output.webp

## File Structure

Place optimized images in: public/images/optimized/

## Quality Settings

- **WebP**: 80% quality
- **PNG**: Lossless compression
- **Mobile**: Smaller file sizes, good quality
- **Desktop**: Higher quality, larger file sizes
