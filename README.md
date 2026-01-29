# Vite + React Leaflet Map Application

## Overview
This project integrates **LeafletJS** with **React-Leaflet** to provide an interactive mapping interface.  
It supports dynamic rendering fields with add/remove functionality and points with add/remove, filtering, searching, sorting functionality.

## Features
- **Map Rendering**
    - Fullscreen map using LeafletJS and React-Leaflet.

- **Create Field Management**
    - Add field (`Polygon`) by `[lng, lat]` collections.

- **Fields Management**
    - Show fields (`Polygons`) by `[lng, lat]` collections and remove by `fieldId`.

- **Points Management**
    - Add points by `[lng, lat]` and remove by `fieldId`.

- **Filtering & Search**
    - Filter points by type.
    - Search points by description.
    - Sort points by date (`asc` / `desc`).

- **Redux State Management**
    - `fieldsSlice` for handle `Polygons` with reducers for add/remove, select.
    - `fieldSlice` for creating new `Polygon` with reducers for add/remove, generateField and togglePointsMode (add/remove).
    - `pointsSlice` for creating new `Points` with reducers for add/remove, filter, search, sort.
    - `sharedSlice` for handle to preserve the feature structure.

## Tech Stack
- **React** with TypeScript
- **LeafletJS** + **React-Leaflet**
- **Redux Toolkit** for state management
- **shadcn/ui** for Sidebar and UI components
- **Tailwind CSS** for styling
- **turf** for calculation area
- **mgrs** for calculation coordinates 

## Usage
1. Install dependencies:
```bash
npm install
```

2. Run:

In `package.json` you should have:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.
