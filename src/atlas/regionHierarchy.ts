import type { RegionHierarchyNode } from './types';

export const REGION_HIERARCHY: RegionHierarchyNode[] = [
  {
    id: 'cortex',
    label: 'Cortex',
    children: [
      { id: 'motor', label: 'Motor Cortex', children: [
        { id: 'MOp-node', label: 'MOp - Primary Motor', regionId: 'MOp' },
        { id: 'MOs-node', label: 'MOs - Secondary Motor', regionId: 'MOs' },
      ]},
      { id: 'sensory', label: 'Sensory Cortex', children: [
        { id: 'SSp-node', label: 'SSp - Primary Somatosensory', regionId: 'SSp' },
        { id: 'VIS-node', label: 'VIS - Visual', regionId: 'VIS' },
        { id: 'AUD-node', label: 'AUD - Auditory', regionId: 'AUD' },
      ]},
      { id: 'prefrontal', label: 'Prefrontal Cortex', children: [
        { id: 'ACA-node', label: 'ACA - Anterior Cingulate', regionId: 'ACA' },
        { id: 'PL-node', label: 'PL - Prelimbic', regionId: 'PL' },
        { id: 'ILA-node', label: 'ILA - Infralimbic', regionId: 'ILA' },
      ]},
      { id: 'association', label: 'Association Cortex', children: [
        { id: 'PPC-node', label: 'PPC - Posterior Parietal', regionId: 'PPC' },
        { id: 'RSC-node', label: 'RSC - Retrosplenial', regionId: 'RSC' },
      ]},
    ],
  },
  {
    id: 'hippocampus',
    label: 'Hippocampal Formation',
    children: [
      { id: 'HIP-node', label: 'HIP - Hippocampus', regionId: 'HIP' },
      { id: 'CA1-node', label: 'CA1', regionId: 'CA1' },
      { id: 'CA3-node', label: 'CA3', regionId: 'CA3' },
      { id: 'DG-node', label: 'DG - Dentate Gyrus', regionId: 'DG' },
    ],
  },
  {
    id: 'subcortical',
    label: 'Subcortical Nuclei',
    children: [
      { id: 'basal-ganglia', label: 'Basal Ganglia', children: [
        { id: 'CP-node', label: 'CP - Caudoputamen', regionId: 'CP' },
        { id: 'GPe-node', label: 'GPe - Globus Pallidus', regionId: 'GPe' },
        { id: 'ACB-node', label: 'ACB - Nucleus Accumbens', regionId: 'ACB' },
      ]},
      { id: 'amygdala', label: 'Amygdala', children: [
        { id: 'BLA-node', label: 'BLA - Basolateral', regionId: 'BLA' },
        { id: 'CEA-node', label: 'CEA - Central', regionId: 'CEA' },
      ]},
      { id: 'CLA-node', label: 'CLA - Claustrum', regionId: 'CLA' },
    ],
  },
  {
    id: 'thalamus',
    label: 'Thalamus & Hypothalamus',
    children: [
      { id: 'TH-node', label: 'TH - Thalamus', regionId: 'TH' },
      { id: 'HY-node', label: 'HY - Hypothalamus', regionId: 'HY' },
      { id: 'LHA-node', label: 'LHA - Lateral Hypothalamic', regionId: 'LHA' },
      { id: 'PVH-node', label: 'PVH - Paraventricular', regionId: 'PVH' },
    ],
  },
  {
    id: 'midbrain',
    label: 'Midbrain',
    children: [
      { id: 'VTA-node', label: 'VTA - Ventral Tegmental', regionId: 'VTA' },
      { id: 'SNc-node', label: 'SNc - Substantia Nigra', regionId: 'SNc' },
      { id: 'PAG-node', label: 'PAG - Periaqueductal Gray', regionId: 'PAG' },
      { id: 'SCm-node', label: 'SCm - Superior Colliculus', regionId: 'SCm' },
    ],
  },
  {
    id: 'hindbrain',
    label: 'Hindbrain',
    children: [
      { id: 'CB-node', label: 'CB - Cerebellum', regionId: 'CB' },
      { id: 'LC-node', label: 'LC - Locus Coeruleus', regionId: 'LC' },
    ],
  },
];
