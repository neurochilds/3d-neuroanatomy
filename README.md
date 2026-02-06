# 3D Mouse Neuroanatomy

Interactive 3D mouse brain atlas for learning neuroanatomy. Built for neuroscientists who need to identify brain regions quickly and accurately.

## Features

- **Teaching Mode** — Rotate and explore a 3D mouse brain. Click any region for details: function, surgical notes, stereotaxic coordinates, and connections to other areas.
- **Quiz Mode** — A region highlights in the 3D view. Identify it via multiple choice or free text. Spaced repetition (SM-2) tracks what you know and prioritizes weak areas.
- **30 regions** covering cortex, hippocampus, subcortical nuclei, thalamus/hypothalamus, midbrain, and hindbrain — including PPC and RSC for audiovisual integration and spatial navigation research.

## Data Sources

3D mesh geometry is from the **Allen Mouse Brain Common Coordinate Framework (CCFv3)**:

- **Meshes:** Structure meshes downloaded from the [Allen Institute informatics archive](https://download.alleninstitute.org/informatics-archive/current-release/mouse_ccf/annotation/ccf_2017/structure_meshes/) (OBJ format, CCFv3 2017 annotation)
- **Region metadata:** Allen Mouse Brain Atlas ontology — structure names, acronyms, hierarchy, and colors from the [Allen Brain Atlas API](http://api.brain-map.org/api/v2/data/query.json?criteria=model::Structure)
- **Reference:** Wang et al. (2020). "The Allen Mouse Brain Common Coordinate Framework: A 3D Reference Atlas." *Cell*, 181(4), 936-953. https://doi.org/10.1016/j.cell.2020.04.007

The Allen Institute data is provided under the [Allen Institute Terms of Use](https://alleninstitute.org/terms-of-use/).

## Tech Stack

React + TypeScript + Vite, react-three-fiber for 3D rendering, Zustand for state management with localStorage persistence.

## Getting Started

```bash
npm install
npm run dev
```

Opens at http://localhost:5173.

## License

Code is MIT. Brain mesh data is subject to Allen Institute terms (see above).
