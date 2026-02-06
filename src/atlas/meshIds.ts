/**
 * Maps our region IDs to Allen Brain Atlas CCF structure mesh file IDs.
 * Some regions use parent/sibling structure IDs when the exact structure
 * doesn't have its own mesh in the CCF annotation.
 *
 * Mesh files are OBJ format, stored in /public/meshes/{id}.obj
 * Downloaded from: https://download.alleninstitute.org/informatics-archive/
 *   current-release/mouse_ccf/annotation/ccf_2017/structure_meshes/
 */
export const MESH_ID_MAP: Record<string, number> = {
  // Cortex
  MOp: 985,     // Primary motor area
  MOs: 993,     // Secondary motor area
  SSp: 337,     // Primary somatosensory area, lower limb (SSp-ll as representative)
  VIS: 669,     // Visual areas
  AUD: 247,     // Auditory areas
  ACA: 31,      // Anterior cingulate area
  PL: 972,      // Prelimbic area
  ILA: 44,      // Infralimbic area
  PPC: 22,      // Posterior parietal association areas (PTLp)
  RSC: 886,     // Retrosplenial area, ventral part (RSPv)

  // Hippocampus
  HIP: 1089,    // Hippocampal formation (HPF)
  CA1: 382,     // Field CA1
  CA3: 463,     // Field CA3
  DG: 726,      // Dentate gyrus

  // Subcortical
  CP: 672,      // Caudoputamen
  ACB: 56,      // Nucleus accumbens
  BLA: 295,     // Basolateral amygdalar nucleus
  CEA: 536,     // Central amygdalar nucleus
  GPe: 1022,    // Globus pallidus, external segment (GP)
  CLA: 583,     // Claustrum

  // Thalamus & Hypothalamus
  TH: 549,      // Thalamus, sensory-motor cortex related (DORsm)
  HY: 1097,     // Hypothalamus
  LHA: 194,     // Lateral hypothalamic area
  PVH: 38,      // Paraventricular hypothalamic nucleus

  // Midbrain
  VTA: 749,     // Ventral tegmental area
  SNc: 374,     // Substantia nigra, compact part
  PAG: 795,     // Periaqueductal gray
  SCm: 302,     // Superior colliculus, motor related (SC)

  // Hindbrain
  CB: 512,      // Cerebellum
  LC: 147,      // Locus ceruleus
};

/** Root brain mesh for the outer shell */
export const BRAIN_SHELL_MESH_ID = 997;

/**
 * Allen CCF coordinate transform parameters.
 * Meshes are in 10μm voxel space. We center and scale to ~mm units for Three.js.
 */
export const CCF_TRANSFORM = {
  /** Center of the CCF volume (in 10μm voxels) */
  center: [6588, 3849, 5688] as [number, number, number],
  /** Scale factor: divide by this to get mm-ish units suitable for Three.js */
  scale: 1000,
};
