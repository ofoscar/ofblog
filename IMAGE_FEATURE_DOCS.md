# Image Feature Documentation

## Overview
The TipTap editor now supports image insertion and display functionality with multiple input methods and enhanced styling.

## Features Added

### 1. Image Button in Toolbar
- Added an image icon button next to the link button in the TipTap editor toolbar
- Allows users to insert images easily while writing blog posts

### 2. Multiple Image Input Methods

#### URL Input
- Click the image button and select "OK" to add image from URL
- Enter the image URL when prompted
- Optionally add alt text for accessibility

#### File Upload
- Click the image button and select "Cancel" to upload a file
- Select an image file from your computer
- The image will be converted to base64 and embedded in the post
- Optionally customize the alt text (defaults to filename)

#### Drag and Drop
- Simply drag an image file from your computer into the editor
- The image will be automatically inserted at the drop location
- Alt text defaults to the filename

### 3. Image Styling
Images are automatically styled with:
- Responsive sizing (max-width: 100%)
- Rounded corners
- Shadow effects
- Center alignment
- Proper spacing (margins)

### 4. Display in Posts
Images inserted in the editor will be properly displayed in:
- The editor preview
- The published post view (PostPage)
- Post listings and excerpts

## Usage Instructions

### For Content Creators:

1. **Adding Images via URL:**
   - Click the image button (📷) in the editor toolbar
   - Choose "OK" when prompted about URL vs file upload
   - Enter the image URL
   - Add alt text for accessibility
   - The image will appear in your post

2. **Adding Images via File Upload:**
   - Click the image button (📷) in the editor toolbar
   - Choose "Cancel" when prompted (this selects file upload)
   - Select an image file from your computer
   - Modify the alt text if desired
   - The image will be embedded in your post

3. **Adding Images via Drag & Drop:**
   - Drag an image file from your computer
   - Drop it directly into the editor where you want it
   - The image will be inserted automatically

### For Developers:

#### TipTapEditor Changes:
- Added `@tiptap/extension-image` import and configuration
- Added image button to toolbar with ImageIcon from lucide-react
- Implemented `addImage` callback with dual input methods
- Added drag & drop handling in `editorProps.handleDrop`
- Configured image styling with custom CSS classes

#### TipTapViewer Changes:
- Added Image extension to display images in read-only mode
- Applied consistent styling for published posts

#### CSS Enhancements:
- Added custom styles in `index.css` for proper image display
- Ensured compatibility with Tailwind Typography
- Added hover and shadow effects

## Technical Implementation

### Extensions Used:
```typescript
Image.configure({
  HTMLAttributes: {
    class: 'max-w-full h-auto rounded-lg shadow-sm my-4 mx-auto block cursor-pointer',
  },
  allowBase64: true,
  inline: false,
})
```

### File Upload Implementation:
```typescript
const input = document.createElement('input');
input.type = 'file';
input.accept = 'image/*';
input.onchange = (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const alt = window.prompt('Enter alt text (optional)', file.name) || file.name;
      editor.chain().focus().setImage({ src, alt }).run();
    };
    reader.readAsDataURL(file);
  }
};
```

### Drag & Drop Implementation:
```typescript
handleDrop: (view, event, slice, moved) => {
  if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
    const file = event.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
      // Handle file processing and insertion
      return true;
    }
  }
  return false;
}
```

## Best Practices

1. **Image Optimization:**
   - Use appropriate image sizes (recommended: max 1200px width)
   - Compress images for web use
   - Consider using CDN URLs for better performance

2. **Accessibility:**
   - Always provide meaningful alt text
   - Use descriptive text that explains the image content
   - Consider users with visual impairments

3. **User Experience:**
   - Test both URL and file upload methods
   - Ensure images load quickly
   - Verify images display properly on different screen sizes

## Future Enhancements

Potential improvements could include:
- Image resizing handles in the editor
- Image caption support
- Gallery/carousel functionality
- Image optimization/compression
- Cloud storage integration
- Image alignment options (left, right, center)
