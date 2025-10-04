# 📱 SnapWidget Instagram Integration Guide

## Quick Setup Steps

### 1. Get Your SnapWidget Code
1. Go to [snapwidget.com](https://snapwidget.com)
2. Sign up for a free account
3. Connect your Instagram account (`@litchfieldperk`)
4. Choose a widget style that matches your dark theme
5. Copy the embed code they provide

### 2. Replace the Placeholder Code

Open `src/components/InstagramWidget.jsx` and replace the placeholder section with your SnapWidget embed code.

**Find this section:**
```jsx
{/* 
  REPLACE THIS SECTION WITH YOUR SNAPWIDGET EMBED CODE
  ...
*/}
<div className="bg-white/5 rounded-xl p-6 border border-white/10">
  {/* Placeholder - Replace with SnapWidget embed code */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {/* ... placeholder content ... */}
  </div>
</div>
```

**Replace with your SnapWidget code (example):**
```jsx
<div className="bg-white/5 rounded-xl p-6 border border-white/10">
  <script src="https://snapwidget.com/js/snapwidget.js"></script>
  <iframe 
    src="https://snapwidget.com/embed/your-widget-id" 
    className="snapwidget-widget" 
    allowtransparency="true" 
    frameborder="0" 
    scrolling="no" 
    style={{border:'none', overflow:'hidden', width:'100%', height:'400px'}}
  />
</div>
```

### 3. Recommended SnapWidget Settings

For best results with your dark theme, use these settings:
- **Layout**: Grid (2x2 or 4x1)
- **Theme**: Dark or Custom
- **Colors**: Match your site's emerald/green accent
- **Size**: Medium or Large
- **Posts**: 4-8 recent posts

### 4. Alternative: LightWidget

If you prefer LightWidget:
1. Go to [lightwidget.com](https://lightwidget.com)
2. Follow similar steps
3. Replace the embed code in the same location

### 5. Testing

After adding your widget:
1. Run `npm run dev`
2. Check that the Instagram feed displays properly
3. Test on mobile devices
4. Verify all images load correctly

## Troubleshooting

- **Widget not showing**: Check browser console for JavaScript errors
- **Styling issues**: The widget should inherit your dark theme styling
- **Mobile problems**: Test responsive behavior on different screen sizes

## Customization

You can further customize the widget by:
- Adjusting the container styling in `InstagramWidget.jsx`
- Modifying the SnapWidget settings in their dashboard
- Adding custom CSS for better integration

