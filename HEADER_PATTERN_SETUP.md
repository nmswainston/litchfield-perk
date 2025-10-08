# 🌿 Botanical Pattern Header Setup

## Step 1: Add Your Image File

1. **Save your botanical pattern image** as `botanical-pattern.png`
2. **Place it in the `public` folder** of your project:
   ```
   litchfield-perk/
   ├── public/
   │   ├── botanical-pattern.png  ← Add your image here
   │   ├── favicon.ico
   │   └── ...
   ```

## Step 2: Image Requirements

For best results, your image should be:

- **Format**: PNG (with transparency) or JPG
- **Size**: Square format (e.g., 300x300px, 400x400px, or 500x500px)
- **Quality**: High resolution for crisp tiling
- **Background**: White or transparent (will work with the dark overlay)

## Step 3: Customization Options

You can adjust the pattern in `src/LitchfieldPerkSite.jsx`:

### Pattern Size

```jsx
backgroundSize: '300px 300px',  // Smaller = more tiles
backgroundSize: '400px 400px',  // Larger = fewer tiles
```

### Pattern Opacity

```jsx
className = "absolute inset-0 opacity-20"; // 20% opacity
className = "absolute inset-0 opacity-30"; // 30% opacity (more visible)
```

### Overlay Darkness

```jsx
<div className="absolute inset-0 bg-[#0e0e10]/60" />  // 60% dark overlay
<div className="absolute inset-0 bg-[#0e0e10]/40" />  // 40% dark overlay (lighter)
```

## Step 4: Test the Pattern

1. Run `npm run dev`
2. Check that the pattern tiles correctly
3. Adjust opacity and size as needed
4. Test on different screen sizes

## Alternative: Different Background Areas

If you want the pattern in other sections, you can add it to:

- Header navigation area
- Menu section background
- Footer background
- Individual menu cards

Just copy the same pattern div structure and adjust the positioning!
