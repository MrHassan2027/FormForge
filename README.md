# FormForge

> Drag-and-drop form builder that exports clean HTML + validation JavaScript

## What it does
A React-based visual form builder. Drag field types (text, email, select, checkbox, date, file upload) onto a canvas, configure labels and validation rules, then export a self-contained HTML file with built-in JS validation — no framework dependencies in the output.

## Quick Start
```bash
git clone https://github.com/MrHassan2027/FormForge
cd FormForge
npm install
npm run dev
# Open http://localhost:5173
```

## Features
- Drag-and-drop field palette: Text, Email, Number, Select, Checkbox, Radio, Date, File, Textarea
- Per-field config: label, placeholder, required, min/max, regex pattern
- Multi-step form support (wizards)
- Live preview mode
- Export: standalone HTML + vanilla JS validation, or React component, or JSON schema
- Conditional logic: show/hide fields based on other field values

## Tech Stack
| Tool | Why |
|------|-----|
| React 18 + TypeScript | Component tree mirrors form structure |
| `@dnd-kit/core` | Accessible drag-and-drop |
| `zustand` | Form schema state |
| Tailwind CSS | UI styling |
| `html-minifier` | Clean export output |

## Architecture
```
src/
├── builder/
│   ├── Canvas.tsx         # Drop zone for fields
│   ├── FieldPalette.tsx   # Draggable field types
│   └── FieldConfig.tsx    # Per-field settings panel
├── preview/
│   └── FormPreview.tsx    # Live rendered form
├── export/
│   ├── htmlExporter.ts    # Generates standalone HTML
│   └── reactExporter.ts   # Generates React component
└── store/
    └── formStore.ts       # Form schema + field order
```
