# Project Detail Page Features

## What's New? ✨

Your portfolio now has **detailed project pages** with support for:
- ✅ Clickable project cards
- ✅ Multiple images (photo gallery)
- ✅ 3D model viewer
- ✅ Rich text descriptions
- ✅ All project metadata

## How to Use

### 1. Viewing Project Details
- Click on any project card on the homepage
- You'll be taken to `/projects/{id}` with full details
- Use the "Back to Projects" link to return

### 2. Adding Multiple Images
In Strapi (http://localhost:1337/admin):
1. Go to Content Manager → Projects
2. Select or create a project
3. In the **Images** field, click "Add more files"
4. Upload as many images as you want
5. All images will appear in a responsive gallery

### 3. Uploading 3D Models
The schema now supports **3D model files**!

#### Supported Formats:
- `.glb` (recommended) - Binary glTF
- `.gltf` - glTF with separate files
- `.obj` with `.mtl` - Older format (needs conversion)

#### Steps to Add a 3D Model:
1. In Strapi, edit your project
2. Scroll to the new **Model3d** field
3. Upload your `.glb` or `.gltf` file
4. Save and publish

#### How to Get 3D Models:
- **From Fusion 360**: File → Export → Save as `.obj`, then convert to `.glb` using https://products.aspose.app/3d/conversion/obj-to-glb
- **From Blender**: File → Export → glTF 2.0 (.glb)
- **From Tinkercad**: Export as `.obj`, convert to `.glb`
- **From SketchUp**: Use plugins to export glTF

#### 3D Viewer Controls:
- **Click + Drag**: Rotate model
- **Scroll**: Zoom in/out
- **Two fingers (mobile)**: Pan and rotate
- **Auto-rotate**: Model spins automatically when idle

### 4. Long Description (Rich Text)
The **Long Description** field supports:
- Paragraphs with formatting
- Bold, italic, underline
- Bullet points and numbered lists
- Links
- Code blocks

This appears in the "About This Project" section on the detail page.

## Technical Details

### New Files Created:
- `frontend/src/app/projects/[id]/page.tsx` - Dynamic project detail page
- `frontend/src/components/ModelViewer.tsx` - 3D model viewer component
- `frontend/src/types/model-viewer.d.ts` - TypeScript definitions

### Updated Files:
- `cms/src/api/project/content-types/project/schema.json` - Added `model3d` field
- `frontend/src/lib/api.ts` - Added `getProject(id)` function
- `frontend/src/components/ProjectsSection.tsx` - Made cards clickable with Link

### 3D Viewer Library:
Uses Google's `model-viewer` web component (3.3.0)
- Lightweight and performant
- Works on all modern browsers
- Supports AR on mobile devices

## Example Workflow

1. **Design in CAD**: Create your plane in Fusion 360
2. **Export**: Save as `.obj` or `.stl`
3. **Convert**: Use online tool to convert to `.glb`
4. **Upload to Strapi**: Add to your "Year 2 Plane" project
5. **Add Photos**: Upload assembly photos, flight photos, etc.
6. **Write Description**: Add detailed explanation in Long Description
7. **Publish**: Click Save and Publish
8. **View**: Click the project card on your homepage!

## Notes
- 3D models should be optimized (< 50MB recommended)
- Images are automatically optimized by Next.js
- The gallery is responsive (1 column mobile, 3 columns desktop)
- All links open in new tabs for external sites
