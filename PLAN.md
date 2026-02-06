# Neuroanatomy Learning App - Implementation Plan

## Overview

A 3D interactive mouse neuroanatomy learning app with **Teaching Mode** (explore/rotate brain, click regions for info) and **Quiz Mode** (identify highlighted regions via MCQ, spatial clicking, and free text with spaced repetition). Built for a neuroscientist who does mouse brain surgeries.

**Location:** `/Users/ninja/Desktop/ClaudeCodex/neuroanatomy/`

## Tech Stack

- **React + TypeScript + Vite** (build tooling)
- **react-three-fiber + drei** (3D rendering on Three.js)
- **@react-three/postprocessing** (bloom, AO, vignette)
- **Zustand** (state management with localStorage persistence)
- **Procedural geometry** for v0 (AtlasAdapter pattern enables future swap to real Allen Brain Atlas meshes)

## v0 Brain Regions (28 surgically-relevant mouse brain regions)

**Cortex (8):** MOp, MOs, SSp, VIS, AUD, ACA, PL, ILA
**Hippocampus (4):** HIP, CA1, CA3, DG
**Subcortical (6):** CP, ACB, BLA, CEA, GPe, CLA
**Thalamus/Hypothalamus (4):** TH, HY, LHA, PVH
**Midbrain (4):** VTA, SNc, PAG, SCm
**Hindbrain (2):** CB, LC

## Visual Style

Napari-inspired dark theme: deep blue-black background (#0a0a1a), vibrant region colors, translucent brain shell, glow outlines on hover/selection, subtle bloom + ambient occlusion.

---

## Implementation Phases

### Phase 1: Project Setup
1. Scaffold Vite + React + TS in `neuroanatomy/`
2. Install deps: three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, zustand, @types/three
3. Create directory structure
4. Minimal App.tsx with R3F Canvas + spinning cube to verify pipeline
5. Verify `npm run dev` works

### Phase 2: 3D Brain Viewer
**Data layer:**
- `atlas/types.ts` - BrainRegion, AtlasAdapter, QuizQuestion, SRCard interfaces
- `atlas/regionData.ts` - 28 regions with Allen IDs, names, descriptions, surgical notes, procedural geometry params
- `atlas/regionHierarchy.ts` - tree structure for hierarchy browser
- `atlas/MouseAtlasAdapter.ts` - concrete adapter wiring data + geometry

**Geometry:**
- `atlas/geometry/geometryUtils.ts` - ellipsoid, capsule, irregular blob, curved sheet generators
- `atlas/geometry/brainShell.ts` - outer brain shell (ellipsoid ~10mm x 6mm x 6mm with noise deformation)
- `atlas/geometry/regionGeometries.ts` - maps each region to its procedural shape

**Scene:**
- `scene/BrainCanvas.tsx` - R3F Canvas, lighting (ambient + hemisphere + directional), dark background
- `scene/BrainModel.tsx` - renders shell + all region meshes, handles bilateral mirroring
- `scene/BrainShell.tsx` - translucent MeshPhysicalMaterial (transmission: 0.85)
- `scene/RegionMesh.tsx` - per-region component: hover glow, click handling, material
- `scene/CameraController.tsx` - OrbitControls + animated fly-to
- `scene/LabelOverlay.tsx` - drei Html labels showing region acronyms
- `scene/SceneEffects.tsx` - bloom, SSAO, vignette post-processing

### Phase 3: Teaching Mode
- `ui/Layout.tsx` - CSS grid (320px sidebar + 3D viewport)
- `ui/Toolbar.tsx` - mode toggle, shell opacity slider, label toggle
- `ui/InfoPanel.tsx` - region details (description, function, surgical notes, connections, coordinates)
- `ui/HierarchyBrowser.tsx` - collapsible tree navigation
- `ui/SearchBar.tsx` - fuzzy search across region names/acronyms/descriptions
- `ui/RegionList.tsx` - flat filterable list with visibility toggles

### Phase 4: Quiz Mode
- `quiz/spacedRepetition.ts` - SM-2 algorithm
- `quiz/questionGenerator.ts` - generates MCQ / spatial / free-text questions with smart distractor selection
- `quiz/QuizEngine.tsx` - session lifecycle, question sequencing
- `quiz/MCQQuestion.tsx` - 4-choice buttons + keyboard shortcuts (1-4)
- `quiz/SpatialQuestion.tsx` - "click on [region]" with desaturated regions
- `quiz/FreeTextQuestion.tsx` - text input with fuzzy matching
- `quiz/QuizFeedback.tsx` - correct (green glow) / incorrect (red flash + show correct)
- `quiz/QuizProgress.tsx` - score bar, streak counter
- `quiz/QuizSummary.tsx` - end-of-session stats, "Review Mistakes" button

### Phase 5: Polish
- Napari color theme (CSS custom properties, Inter font)
- Glass-morphism sidebar
- Smooth transitions (mode switch, panel open/close, camera fly-to)
- Responsive design (desktop sidebar, mobile bottom sheet)
- localStorage persistence via Zustand persist middleware
- Performance: React.memo on RegionMesh, throttled hover raycasting, lazy geometry

## State Management (Zustand, 5 slices)

| Slice | Key State |
|-------|-----------|
| **ViewerSlice** | visibleRegions, hoveredRegion, selectedRegion, shellOpacity, showLabels |
| **TeachingSlice** | activeInfoRegion, hierarchyExpanded, searchQuery |
| **QuizSlice** | quizActive, currentQuestion, sessionScore, streak |
| **ProgressSlice** | SR cards per region, mastery levels, total reviews |
| **SettingsSlice** | appMode (teaching/quiz), colorScheme, showBilateral |

ProgressSlice + SettingsSlice persisted to localStorage.

## Build Order (dependency sequence)

1. Vite scaffold + deps
2. `atlas/types.ts` (all interfaces)
3. `atlas/regionData.ts` (28 regions)
4. `atlas/geometry/*` (procedural generators)
5. `atlas/MouseAtlasAdapter.ts`
6. `store/useAppStore.ts` + slices
7. `scene/*` (3D rendering)
8. `ui/*` (teaching mode)
9. `quiz/*` (quiz mode)
10. Polish (colors, animations, responsive, persistence)

## Key Technical Decisions

- **Separate meshes per region** (not single mesh + vertex colors) for clean raycasting/highlighting
- **Procedural geometry v0** with AtlasAdapter pattern so real Allen meshes are a data swap, not a rewrite
- **Shell raycasting bypass**: disable pointer events on shell mesh so clicks pass through to interior regions
- **Hover performance**: use Zustand getState/setState + ref mutation in useFrame, not React re-renders
- **Bilateral regions**: InstancedMesh for mirrored copies
