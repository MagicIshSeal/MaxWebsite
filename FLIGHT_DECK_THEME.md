# Flight Deck Theme - Complete Documentation

## Overview
Your website has been transformed into a technical "Flight Deck" engineering interface inspired by avionics displays and aerospace control systems. The theme features monospace typography, cyan accents on a near-black background, technical grid patterns, and data plate styling.

## Color Palette
- **Background**: `bg-slate-950` (almost black)
- **Primary Accent**: `text-cyan-400` / `border-cyan-400`
- **Warning/Status**: `text-amber-400` (for warnings)
- **Text**: `text-slate-300` (body), `text-slate-400` (secondary)
- **Borders**: `border-slate-800` (structure), `border-slate-700` (data plates)

## Typography
### Monospace Fonts (Headings & Technical Elements):
- JetBrains Mono
- Space Mono
- IBM Plex Mono

### Sans-Serif Fonts (Body Text):
- Inter
- Manrope

All headings use `font-mono uppercase tracking-tight` for technical aesthetic.

## Key Components

### 1. SystemBar (Navigation)
**Location**: `frontend/src/components/SystemBar.tsx`

**Features**:
- Fixed top navigation with 3-section layout
- Left: Your name + green LED status indicator (pulse animation)
- Center: Navigation links (PROJECTS, EXPERIENCE, LAB) with corner-bracket hover
- Right: Live UTC clock updating every second
- Uses `usePathname` for active link highlighting

**Styling**:
- Background: `bg-slate-950/95` with `backdrop-blur-md`
- Border: `border-b border-slate-800`
- LED indicator: `.led-indicator` class with pulse animation

### 2. SystemStatus (Footer)
**Location**: `frontend/src/components/SystemStatus.tsx`

**Features**:
- Shows deployment metadata: HOST, REGION, LAST_DEPLOY, BUILD
- Technical readout style with cyan-400 accents

**Styling**:
- Background: `bg-slate-950`
- Font: `text-[10px] font-mono uppercase`

### 3. Hero Section
**Location**: `frontend/src/components/Hero.tsx`

**Updates**:
- Profile image with cyan-400 border and animated top bar
- Uppercase font-mono titles
- STATUS indicator showing "SYSTEMS_OPERATIONAL"
- "SCROLL_DOWN" text in monospace
- Background media opacity reduced to 20%

### 4. ProjectsSection ("Mission_Reports")
**Location**: `frontend/src/components/ProjectsSection.tsx`

**Features**:
- Title: "Mission_Reports" with cyan underline
- Project cards with grayscale images (color on hover)
- Cyan overlay effect on hover
- Project IDs padded (001, 002, etc.) in slate-600
- Type badges: slate-900 background with cyan-400 text
- Removed rounded corners for technical aesthetic

### 5. ExperienceSection ("Service_Record")
**Location**: `frontend/src/components/ExperienceSection.tsx`

**Features**:
- Title: "Service_Record" with cyan underline
- Cards with left cyan border accent (`border-l-2 border-l-cyan-400`)
- Date format with → symbol
- "ACTIVE" status badges with green-500
- Uppercase font-mono headers

### 6. ToolboxSection ("Inventory_System")
**Location**: `frontend/src/components/ToolboxSection.tsx`

**Features**:
- Title: "Inventory_System" with cyan underline
- Cyan proficiency colors (instead of multi-color)
- Technical icons: ⚙ (Software), ▣ (Hardware), ◈ (Other)
- Square cards with center-aligned text
- `hover:border-cyan-400` with group transitions

### 7. Project Detail Page
**Location**: `frontend/src/app/projects/[id]/page.tsx`

**Updates**:
- Background: `bg-slate-950`
- Back button: "Return_to_Mission_Reports" with hover animation
- Hero section with technical badges and cyan-400 title
- Active status badge with pulsing green LED
- Date format: `YYYY-MM-DD → ACTIVE`
- Button labels: "Technical_Report", "Repository", "Live_System"

**Sections**:
- **System_Specifications**: Data plate styling with cyan-400 values
- **Visual_Documentation**: Grayscale images with cyan overlay on hover, IMG_001 labels
- **3D_Model_Viewer**: Technical header
- **Code_Implementation**: Terminal window with copy button
- **Project_Details**: Prose styling with cyan-400 accents

### 8. CodeSnippet Component
**Location**: `frontend/src/components/CodeSnippet.tsx`

**Features**:
- Terminal window styling with header bar
- Filename display: `{language}.code`
- Copy button with "[Copy]" / "[Copied]" feedback
- Background: `bg-slate-900` with `border-slate-800`
- Monospace font for code display

## Custom CSS Classes

### Background Grid
```css
.bg-grid {
  background-image: 
    linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Data Plate
```css
.data-plate {
  @apply text-center p-4 bg-slate-900/30 border border-slate-700 
         hover:border-cyan-400/50 transition-colors;
}
```

### System Bar
```css
.system-bar {
  @apply fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md 
         border-b border-slate-800;
}
```

### LED Indicator
```css
.led-indicator {
  @apply w-2 h-2 rounded-full bg-green-500 animate-pulse;
}
```

### Corner Bracket
```css
.corner-bracket {
  @apply relative;
}
.corner-bracket::before {
  content: '>';
  @apply absolute -left-3 opacity-0 transition-opacity text-cyan-400;
}
.corner-bracket::after {
  content: '<';
  @apply absolute -right-3 opacity-0 transition-opacity text-cyan-400;
}
.corner-bracket:hover::before,
.corner-bracket:hover::after {
  @apply opacity-100;
}
```

### Button Primary
```css
.btn-primary {
  @apply px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 
         font-mono text-sm uppercase tracking-wide
         hover:bg-cyan-400/10 transition-all duration-300
         relative;
}
.btn-primary::before,
.btn-primary::after {
  content: '';
  @apply absolute w-1 h-1 border-cyan-400 transition-all duration-300;
}
.btn-primary::before {
  @apply top-0 left-0 border-t border-l;
}
.btn-primary::after {
  @apply bottom-0 right-0 border-b border-r;
}
```

### Glow Text
```css
.glow-text {
  @apply text-cyan-400;
  text-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
}
```

### Tech Badge
```css
.tech-badge {
  @apply text-xs px-3 py-1 bg-slate-900/50 border border-slate-700 
         text-slate-400 font-mono uppercase tracking-wide
         hover:border-cyan-400 hover:text-cyan-400 transition-colors;
}
```

## Animations

### Scanline
```css
@keyframes scanline {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
```
Duration: 0.6s ease-out

### Blink
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```
Duration: 1s step-end infinite

## How to Update Content

### Via Strapi CMS (No Code Changes Required)

1. **Access Strapi Admin**: http://localhost:1337/admin
   - Login credentials: (your admin account)

2. **Update About Page**:
   - Go to Content Manager → About
   - Edit `heroTitle` and `heroSubtitle` for main headline
   - Update `bio` for description
   - Upload new profile image if needed

3. **Add/Edit Projects**:
   - Go to Content Manager → Projects
   - Fields:
     - `title`, `description`, `longDescription`
     - `type` (e.g., "Personal Project", "School Project")
     - `specifications` (JSON): Add technical specs like `{"weight": "2.5kg", "battery": "5000mAh"}`
     - `codeSnippet` + `codeLanguage`: Add code examples
     - `images`: Upload multiple images for gallery
     - `model3d`: Upload .glb file for 3D viewer
     - `pdfReport`: Upload technical report PDF
     - `tags`: Add searchable tags
     - `technologies`: List technologies used
     - `startDate`, `endDate`, `isOngoing`
     - `githubUrl`, `liveUrl`

4. **Add/Edit Experience**:
   - Go to Content Manager → Experiences
   - Add work history entries
   - Fields: `title`, `company`, `description`, `startDate`, `endDate`, `isOngoing`

5. **Add/Edit Tools**:
   - Go to Content Manager → Tools
   - Add hardware/software inventory
   - Fields: `name`, `category`, `proficiency`, `icon`

6. **Permissions**:
   - Go to Settings → Roles → Public
   - Ensure find/findOne enabled for all content types

## File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with SystemBar/SystemStatus
│   │   ├── globals.css                # Global styles and custom classes
│   │   ├── page.tsx                   # Home page
│   │   └── projects/
│   │       └── [id]/
│   │           └── page.tsx           # Project detail page
│   ├── components/
│   │   ├── SystemBar.tsx              # Top navigation
│   │   ├── SystemStatus.tsx           # Footer
│   │   ├── Hero.tsx                   # Landing hero section
│   │   ├── ProjectsSection.tsx        # Mission Reports
│   │   ├── ExperienceSection.tsx      # Service Record
│   │   ├── ToolboxSection.tsx         # Inventory System
│   │   ├── CodeSnippet.tsx            # Terminal code display
│   │   └── ModelViewer.tsx            # 3D model viewer
│   └── lib/
│       └── api.ts                     # Strapi API calls
└── tailwind.config.js                 # TailwindCSS configuration
```

## Deployment

Your website is containerized with Docker:

```bash
# Start all services
docker compose up -d

# Rebuild after code changes
docker compose up -d --build

# View logs
docker compose logs frontend
docker compose logs strapi

# Stop all services
docker compose down
```

**Services**:
- Frontend: http://localhost:3000
- Strapi CMS: http://localhost:1337
- PostgreSQL: Internal network only

## Technical Notes

1. **Build Warning**: You may see a warning about 'sharp' being required for image optimization. This doesn't affect functionality but can be resolved by adding sharp to dependencies.

2. **TypeScript Errors**: The TypeScript errors visible during editing are temporary compilation artifacts. They resolve when the file is saved and rebuilt.

3. **Grid Background**: The grid pattern is applied to the body element via the `bg-grid` class in `layout.tsx`.

4. **Font Loading**: Fonts are loaded via Google Fonts import in `globals.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
   ```

5. **UTC Clock**: The SystemBar includes a live UTC clock that updates every second using React state and useEffect.

6. **Responsive Design**: All components are fully responsive with mobile-first breakpoints:
   - Mobile: < 768px
   - Tablet: 768px - 1024px
   - Desktop: > 1024px

## Future Enhancements

Potential additions to consider:
1. Syntax highlighting for code snippets (Prism.js or Shiki)
2. Before/After slider with mechanical switch handle
3. Project filtering by technology/type
4. Search functionality across projects
5. Dark/light mode toggle (though current theme is dark-focused)
6. Performance metrics display (simulated telemetry)
7. Achievement/certification badges
8. Interactive timeline for experiences

## Support

For issues or questions:
1. Check Docker logs: `docker compose logs`
2. Verify Strapi content is published (not draft)
3. Check browser console for frontend errors
4. Ensure all containers are running: `docker compose ps`
