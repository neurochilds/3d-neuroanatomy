import type { BrainRegion } from './types';
import { ALLEN_COLORS } from './allenColors';

export const BRAIN_REGIONS: BrainRegion[] = [
  // ──────────────────────────────────────────────
  // CORTEX (10)
  // ──────────────────────────────────────────────
  {
    id: 'MOp',
    allenId: 985,
    name: 'Primary Motor Cortex',
    acronym: 'MOp',
    description:
      'Primary motor area responsible for executing voluntary movements. Contains a somatotopic map where medial regions control hindlimb and lateral regions control forelimb and orofacial movements.',
    surgicalNotes:
      'Center at AP +1.5, ML 1.5 from bregma. Thin skull here; use care with drill. Layer V pyramidal neurons project to spinal cord via corticospinal tract.',
    connections: ['MOs', 'SSp', 'CP', 'TH'],
    group: 'cortex',
    color: '#FF6B6B',
    position: [1.5, 1.5, -0.5],
    geometryParams: {
      shape: 'sheet',
      radii: [1.2, 0.9, 0.35],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 2.0,
    },
    bilateral: true,
  },
  {
    id: 'MOs',
    allenId: 993,
    name: 'Secondary Motor Cortex',
    acronym: 'MOs',
    description:
      'Supplementary motor region involved in motor planning and action selection. Integrates sensory information to guide upcoming movements and is critical for learned motor sequences.',
    surgicalNotes:
      'Center at AP +2.5, ML 1.0 from bregma. Sits rostral and slightly medial to MOp. Overlies anterior portions of cingulate cortex at depth.',
    connections: ['MOp', 'ACA', 'PPC', 'CP'],
    group: 'cortex',
    color: '#FF8E53',
    position: [2.5, 1.0, -0.5],
    geometryParams: {
      shape: 'sheet',
      radii: [1.0, 0.7, 0.3],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 2.0,
    },
    bilateral: true,
  },
  {
    id: 'SSp',
    allenId: 322,
    name: 'Primary Somatosensory Cortex',
    acronym: 'SSp',
    description:
      'Receives tactile, proprioceptive, and nociceptive input from the body via ventral posteromedial and ventral posterolateral thalamic nuclei. Contains the barrel cortex subfield for whisker representation.',
    surgicalNotes:
      'Center at AP -0.5, ML 2.5 from bregma. Barrel field (SSp-bfd) sits at AP -1.0, ML 3.0. Large craniotomy needed for full exposure; avoid middle meningeal artery laterally.',
    connections: ['MOp', 'VIS', 'TH', 'CP'],
    group: 'cortex',
    color: '#FFBD59',
    position: [-0.5, 2.5, -0.5],
    geometryParams: {
      shape: 'sheet',
      radii: [1.8, 1.5, 0.4],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.06,
      noiseFrequency: 1.8,
    },
    bilateral: true,
  },
  {
    id: 'VIS',
    allenId: 669,
    name: 'Visual Cortex',
    acronym: 'VIS',
    description:
      'Primary and higher visual areas processing retinotopic visual information. V1 (VISp) receives direct input from dorsal lateral geniculate nucleus; surrounding areas (VISl, VISal, VISpm) process higher-order features.',
    surgicalNotes:
      'Center at AP -3.5, ML 2.5 from bregma. Located over posterior cortex near lambda. Transverse sinus runs nearby at the posterior margin; avoid puncture during craniotomy.',
    connections: ['SSp', 'RSC', 'PPC', 'TH'],
    group: 'cortex',
    color: '#FFE66D',
    position: [-3.5, 2.5, -0.4],
    geometryParams: {
      shape: 'sheet',
      radii: [1.3, 1.2, 0.35],
      rotation: [0.1, 0, 0],
      noiseAmplitude: 0.04,
      noiseFrequency: 2.2,
    },
    bilateral: true,
  },
  {
    id: 'AUD',
    allenId: 247,
    name: 'Auditory Cortex',
    acronym: 'AUD',
    description:
      'Tonotopically organized cortex receiving input from medial geniculate nucleus of thalamus. Encodes sound frequency, intensity, and temporal patterns critical for auditory perception.',
    surgicalNotes:
      'Center at AP -2.5, ML 4.0 from bregma. Located on lateral surface; requires angled approach or temporal craniotomy. Watch for middle cerebral artery branches.',
    connections: ['SSp', 'VIS', 'TH', 'ACA'],
    group: 'cortex',
    color: '#A8E6CF',
    position: [-2.5, 4.0, -0.8],
    geometryParams: {
      shape: 'sheet',
      radii: [0.8, 0.6, 0.3],
      rotation: [0, 0, 0.5],
      noiseAmplitude: 0.04,
      noiseFrequency: 2.0,
    },
    bilateral: true,
  },
  {
    id: 'ACA',
    allenId: 31,
    name: 'Anterior Cingulate Cortex',
    acronym: 'ACA',
    description:
      'Medial prefrontal region involved in error monitoring, conflict detection, and cost-benefit decision-making. Heavily interconnected with limbic and prefrontal networks.',
    surgicalNotes:
      'Center at AP +1.0, ML 0.3 from bregma, depth 1.0 mm. Sits along the midline; approach with a slight angle to avoid superior sagittal sinus. Often targeted with viral injections at 10-15 degree angle.',
    connections: ['PL', 'ILA', 'MOs', 'RSC'],
    group: 'cortex',
    color: '#88D8B0',
    position: [1.0, 0.3, -1.0],
    geometryParams: {
      shape: 'sheet',
      radii: [1.0, 0.3, 0.5],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.04,
      noiseFrequency: 1.5,
    },
    bilateral: false,
  },
  {
    id: 'PL',
    allenId: 972,
    name: 'Prelimbic Cortex',
    acronym: 'PL',
    description:
      'Medial prefrontal region considered a functional homolog of primate dorsolateral PFC. Critical for working memory, goal-directed behavior, and fear expression.',
    surgicalNotes:
      'Center at AP +1.8, ML 0.3 from bregma, depth 1.5 mm. Approach at 10-degree angle from midline to avoid sinus. Often co-targeted with ILA using angled pipette.',
    connections: ['ILA', 'ACA', 'HIP', 'BLA'],
    group: 'cortex',
    color: '#6FC3DF',
    position: [1.8, 0.3, -1.5],
    geometryParams: {
      shape: 'sheet',
      radii: [0.7, 0.3, 0.5],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.03,
      noiseFrequency: 1.5,
    },
    bilateral: false,
  },
  {
    id: 'ILA',
    allenId: 44,
    name: 'Infralimbic Cortex',
    acronym: 'ILA',
    description:
      'Ventral medial prefrontal region essential for fear extinction and autonomic regulation. Projects heavily to amygdala, hypothalamus, and brainstem autonomic centers.',
    surgicalNotes:
      'Center at AP +1.7, ML 0.3 from bregma, depth 2.5 mm. Sits ventral to PL; same angled approach but deeper injection. Verify depth with electrophysiology to distinguish from PL.',
    connections: ['PL', 'ACA', 'BLA', 'HY'],
    group: 'cortex',
    color: '#B5A8D0',
    position: [1.7, 0.3, -2.5],
    geometryParams: {
      shape: 'sheet',
      radii: [0.6, 0.25, 0.4],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.03,
      noiseFrequency: 1.5,
    },
    bilateral: false,
  },
  {
    id: 'PPC',
    allenId: 22,
    name: 'Posterior Parietal Cortex',
    acronym: 'PPC',
    description:
      'Association cortex integrating multisensory information for spatial navigation and sensorimotor transformations. Encodes heading direction and planned movements in allocentric coordinates.',
    surgicalNotes:
      'Center at AP -2.0, ML 1.7 from bregma. Bordered by SSp laterally and VIS posteriorly. Relatively accessible for chronic window implants and widefield imaging.',
    connections: ['VIS', 'MOs', 'RSC', 'HIP'],
    group: 'cortex',
    color: '#FF9AA2',
    position: [-2.0, 1.7, -0.4],
    geometryParams: {
      shape: 'sheet',
      radii: [0.9, 0.8, 0.3],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.04,
      noiseFrequency: 2.0,
    },
    bilateral: true,
  },
  {
    id: 'RSC',
    allenId: 254,
    name: 'Retrosplenial Cortex',
    acronym: 'RSC',
    description:
      'Mediodorsal cortex critical for spatial memory and navigation, bridging hippocampal and neocortical representations. Contains head-direction cells and encodes contextual associations.',
    surgicalNotes:
      'Center at AP -2.5, ML 0.4 from bregma. Runs along the midline posterior to cingulate. Thin cortex overlying cingulum bundle; control injection depth carefully to avoid white matter.',
    connections: ['HIP', 'VIS', 'PPC', 'ACA'],
    group: 'cortex',
    color: '#C7CEEA',
    position: [-2.5, 0.4, -0.5],
    geometryParams: {
      shape: 'sheet',
      radii: [1.5, 0.4, 0.3],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.04,
      noiseFrequency: 1.8,
    },
    bilateral: false,
  },

  // ──────────────────────────────────────────────
  // HIPPOCAMPUS (4)
  // ──────────────────────────────────────────────
  {
    id: 'HIP',
    allenId: 1080,
    name: 'Hippocampal Formation',
    acronym: 'HIP',
    description:
      'Archicortical structure essential for episodic memory formation, spatial navigation, and contextual encoding. Contains place cells that form cognitive maps of the environment.',
    surgicalNotes:
      'Dorsal hippocampus center at AP -2.0, ML 1.5, DV -1.5 from bregma. Extends from approximately AP -0.9 to AP -3.5. For complete lesions, multiple injection sites along the AP axis are needed.',
    connections: ['CA1', 'CA3', 'DG', 'RSC'],
    group: 'hippocampus',
    color: '#4ECDC4',
    position: [-2.0, 1.5, -1.5],
    geometryParams: {
      shape: 'capsule',
      radii: [1.8, 0.8, 0.7],
      rotation: [0.2, 0.1, 0],
      noiseAmplitude: 0.08,
      noiseFrequency: 1.5,
    },
    bilateral: true,
  },
  {
    id: 'CA1',
    allenId: 382,
    name: 'Hippocampal Field CA1',
    acronym: 'CA1',
    description:
      'Principal output layer of the hippocampus proper. CA1 pyramidal neurons receive input from CA3 via Schaffer collaterals and from entorhinal cortex layer III. Critical for temporal association memory.',
    surgicalNotes:
      'Dorsal CA1 at AP -2.0, ML 1.5, DV -1.25 from bregma. Pyramidal layer is a thin band (~0.1 mm); use electrophysiology to identify sharp-wave ripples for precise targeting.',
    connections: ['CA3', 'DG', 'HIP', 'PL'],
    group: 'hippocampus',
    color: '#2ECC71',
    position: [-2.0, 1.5, -1.25],
    geometryParams: {
      shape: 'capsule',
      radii: [1.5, 0.7, 0.2],
      rotation: [0.2, 0.1, 0],
      noiseAmplitude: 0.06,
      noiseFrequency: 1.8,
    },
    bilateral: true,
  },
  {
    id: 'CA3',
    allenId: 463,
    name: 'Hippocampal Field CA3',
    acronym: 'CA3',
    description:
      'Recurrent network in the hippocampus thought to serve as an autoassociative memory for pattern completion. Receives mossy fiber input from dentate gyrus granule cells.',
    surgicalNotes:
      'Dorsal CA3 at AP -2.0, ML 2.2, DV -2.0 from bregma. More lateral and deeper than CA1. Large mossy fiber boutons make this region identifiable histologically.',
    connections: ['CA1', 'DG', 'HIP', 'TH'],
    group: 'hippocampus',
    color: '#1ABC9C',
    position: [-2.0, 2.2, -2.0],
    geometryParams: {
      shape: 'blob',
      radii: [1.2, 0.5, 0.4],
      rotation: [0.3, 0.15, 0],
      noiseAmplitude: 0.07,
      noiseFrequency: 1.6,
    },
    bilateral: true,
  },
  {
    id: 'DG',
    allenId: 726,
    name: 'Dentate Gyrus',
    acronym: 'DG',
    description:
      'Gateway to the hippocampal trisynaptic circuit. Granule cells receive entorhinal input via the perforant path and project to CA3 via mossy fibers. One of two adult neurogenesis sites in the mammalian brain.',
    surgicalNotes:
      'Dorsal DG at AP -2.0, ML 1.2, DV -1.8 from bregma. The granule cell layer forms a V-shape; target the crest for maximal coverage. Adult-born neurons in the subgranular zone are sensitive to surgical trauma.',
    connections: ['CA3', 'CA1', 'HIP', 'ACB'],
    group: 'hippocampus',
    color: '#45B7D1',
    position: [-2.0, 1.2, -1.8],
    geometryParams: {
      shape: 'capsule',
      radii: [1.3, 0.5, 0.35],
      rotation: [0.2, 0.1, 0],
      noiseAmplitude: 0.07,
      noiseFrequency: 1.7,
    },
    bilateral: true,
  },

  // ──────────────────────────────────────────────
  // SUBCORTICAL (6)
  // ──────────────────────────────────────────────
  {
    id: 'CP',
    allenId: 672,
    name: 'Caudoputamen (Striatum)',
    acronym: 'CP',
    description:
      'Largest nucleus of the basal ganglia, integrating cortical, thalamic, and dopaminergic inputs. Contains GABAergic medium spiny neurons organized into direct (D1) and indirect (D2) pathways controlling action selection.',
    surgicalNotes:
      'Center at AP +0.5, ML 2.0, DV -3.0 from bregma. Very large nucleus; accessible from dorsal approach. Internal capsule fibers run through it — fiber photometry fibers should avoid these bundles.',
    connections: ['MOp', 'MOs', 'SSp', 'GPe'],
    group: 'subcortical',
    color: '#9B59B6',
    position: [0.5, 2.0, -3.0],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [1.5, 1.0, 1.2],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.06,
      noiseFrequency: 1.5,
    },
    bilateral: true,
  },
  {
    id: 'ACB',
    allenId: 56,
    name: 'Nucleus Accumbens',
    acronym: 'ACB',
    description:
      'Ventral striatal structure central to reward processing, motivation, and reinforcement learning. Core and shell subdivisions have distinct connectivity and roles in incentive salience attribution.',
    surgicalNotes:
      'Center at AP +1.2, ML 1.0, DV -4.5 from bregma. Deep target; use angled approach to avoid lateral ventricle. Core vs shell targeting requires precise ML/DV coordinates — shell is more medial and ventral.',
    connections: ['VTA', 'PL', 'BLA', 'CP'],
    group: 'subcortical',
    color: '#8E44AD',
    position: [1.2, 1.0, -4.5],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [0.6, 0.5, 0.5],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 2.0,
    },
    bilateral: true,
  },
  {
    id: 'BLA',
    allenId: 295,
    name: 'Basolateral Amygdala',
    acronym: 'BLA',
    description:
      'Principal input nucleus of the amygdala complex. Encodes emotional valence of stimuli and associates sensory cues with rewarding or aversive outcomes. Projects to prefrontal cortex, striatum, and central amygdala.',
    surgicalNotes:
      'Center at AP -1.5, ML 3.3, DV -4.8 from bregma. Approach vertically or at slight angle to avoid hippocampus. Distinguished from lateral amygdala (dorsal) and central amygdala (dorsomedial) by cytoarchitecture.',
    connections: ['CEA', 'PL', 'ACB', 'HIP'],
    group: 'subcortical',
    color: '#E056A0',
    position: [-1.5, 3.3, -4.8],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [0.6, 0.5, 0.6],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 1.8,
    },
    bilateral: true,
  },
  {
    id: 'CEA',
    allenId: 536,
    name: 'Central Amygdala',
    acronym: 'CEA',
    description:
      'Main output nucleus of the amygdala, orchestrating fear and defensive behavioral responses. Contains GABAergic neurons that project to brainstem and hypothalamic effector regions controlling freezing, autonomic responses, and stress hormones.',
    surgicalNotes:
      'Center at AP -1.2, ML 2.8, DV -4.5 from bregma. Sits dorsomedial to BLA. Small nucleus; use fine-tipped pipettes and small injection volumes (50-100 nL) to avoid spread into adjacent BLA.',
    connections: ['BLA', 'HY', 'PAG', 'LHA'],
    group: 'subcortical',
    color: '#C0392B',
    position: [-1.2, 2.8, -4.5],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [0.4, 0.35, 0.4],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.04,
      noiseFrequency: 2.0,
    },
    bilateral: true,
  },
  {
    id: 'GPe',
    allenId: 1022,
    name: 'Globus Pallidus, external segment',
    acronym: 'GPe',
    description:
      'Key node in the basal ganglia indirect pathway. Receives GABAergic input from striatal D2-MSNs and provides tonic inhibition to the subthalamic nucleus. Dysfunction contributes to parkinsonian akinesia.',
    surgicalNotes:
      'Center at AP -0.3, ML 2.0, DV -3.8 from bregma. Medial to striatum, lateral to internal capsule. High-frequency firing neurons (~50 Hz) are electrophysiologically distinctive and aid targeting.',
    connections: ['CP', 'TH', 'SNc', 'ACB'],
    group: 'subcortical',
    color: '#D4A5A5',
    position: [-0.3, 2.0, -3.8],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [0.5, 0.3, 0.45],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.04,
      noiseFrequency: 2.0,
    },
    bilateral: true,
  },
  {
    id: 'CLA',
    allenId: 583,
    name: 'Claustrum',
    acronym: 'CLA',
    description:
      'Thin sheet of gray matter between insular cortex and striatum with widespread reciprocal cortical connections. Hypothesized to coordinate conscious percepts by synchronizing cortical activity across modalities.',
    surgicalNotes:
      'Center at AP +0.5, ML 3.5, DV -2.5 from bregma. Extremely thin structure (~0.1-0.2 mm); precise targeting is challenging. Use retrograde tracers from cortex or Cre-driver lines (Gnb4-Cre) for specificity.',
    connections: ['MOp', 'SSp', 'ACA', 'VIS'],
    group: 'subcortical',
    color: '#7F8C8D',
    position: [0.5, 3.5, -2.5],
    geometryParams: {
      shape: 'sheet',
      radii: [1.0, 0.1, 0.8],
      rotation: [0, 0, 0.2],
      noiseAmplitude: 0.03,
      noiseFrequency: 2.5,
    },
    bilateral: true,
  },

  // ──────────────────────────────────────────────
  // THALAMUS / HYPOTHALAMUS (4)
  // ──────────────────────────────────────────────
  {
    id: 'TH',
    allenId: 549,
    name: 'Thalamus',
    acronym: 'TH',
    description:
      'Major relay center of the diencephalon. Nearly all sensory and motor information passes through thalamic nuclei en route to cortex. Also plays active roles in attention, consciousness, and cortico-thalamo-cortical loops.',
    surgicalNotes:
      'Center at AP -1.5, ML 1.0, DV -3.5 from bregma. Large structure with many subnuclei; specify target nucleus (e.g., VPM, MD, LD) for precise work. Passes near the third ventricle medially.',
    connections: ['SSp', 'VIS', 'MOp', 'HIP'],
    group: 'thalamus',
    color: '#3498DB',
    position: [-1.5, 1.0, -3.5],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [1.2, 1.0, 0.8],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 1.5,
    },
    bilateral: true,
  },
  {
    id: 'HY',
    allenId: 1097,
    name: 'Hypothalamus',
    acronym: 'HY',
    description:
      'Master regulator of homeostasis controlling feeding, thermoregulation, circadian rhythms, stress responses, and reproductive behavior. Contains neuroendocrine neurons projecting to pituitary gland.',
    surgicalNotes:
      'Center at AP -1.0, ML 0.5, DV -5.0 from bregma. Deep ventral structure near the base of the brain. Use long, thin cannulae. Third ventricle lies medially; slight lateral offset avoids it.',
    connections: ['LHA', 'PVH', 'ILA', 'CEA'],
    group: 'thalamus',
    color: '#2980B9',
    position: [-1.0, 0.5, -5.0],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [1.0, 0.7, 0.8],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 1.5,
    },
    bilateral: true,
  },
  {
    id: 'LHA',
    allenId: 194,
    name: 'Lateral Hypothalamic Area',
    acronym: 'LHA',
    description:
      'Contains orexin/hypocretin and MCH neurons critical for arousal, feeding motivation, and reward seeking. Historically called the "hunger center"; lesions cause aphagia and adipsia.',
    surgicalNotes:
      'Center at AP -1.5, ML 1.2, DV -5.2 from bregma. Lateral to fornix, which serves as a landmark. Orexin neurons are scattered; larger injection volumes may be needed for full coverage.',
    connections: ['HY', 'VTA', 'ACB', 'CEA'],
    group: 'thalamus',
    color: '#5DADE2',
    position: [-1.5, 1.2, -5.2],
    geometryParams: {
      shape: 'blob',
      radii: [0.7, 0.5, 0.4],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.06,
      noiseFrequency: 1.8,
    },
    bilateral: true,
  },
  {
    id: 'PVH',
    allenId: 38,
    name: 'Paraventricular Hypothalamic Nucleus',
    acronym: 'PVH',
    description:
      'Key neuroendocrine nucleus containing CRH neurons that initiate the HPA stress axis, and oxytocin/vasopressin neurons projecting to posterior pituitary. Also sends descending autonomic projections to brainstem.',
    surgicalNotes:
      'Center at AP -0.8, ML 0.2, DV -4.8 from bregma. Adjacent to the third ventricle; use small volumes (25-50 nL) to prevent ventricular spread. Midline approach with slight lateral offset.',
    connections: ['HY', 'LHA', 'PAG', 'ILA'],
    group: 'thalamus',
    color: '#85C1E9',
    position: [-0.8, 0.2, -4.8],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [0.3, 0.2, 0.35],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.03,
      noiseFrequency: 2.0,
    },
    bilateral: false,
  },

  // ──────────────────────────────────────────────
  // MIDBRAIN (4)
  // ──────────────────────────────────────────────
  {
    id: 'VTA',
    allenId: 749,
    name: 'Ventral Tegmental Area',
    acronym: 'VTA',
    description:
      'Primary source of mesocorticolimbic dopamine. DA neurons projecting to nucleus accumbens and prefrontal cortex mediate reward prediction error, motivation, and reinforcement learning.',
    surgicalNotes:
      'Center at AP -3.2, ML 0.5, DV -4.4 from bregma. Sits medial to SNc on the ventral midbrain floor. Use angled approach (10 degrees) to avoid aqueduct. DA neurons identifiable by low firing rate and wide spike waveform.',
    connections: ['ACB', 'PL', 'LHA', 'SNc'],
    group: 'midbrain',
    color: '#E67E22',
    position: [-3.2, 0.5, -4.4],
    geometryParams: {
      shape: 'blob',
      radii: [0.5, 0.4, 0.3],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 2.0,
    },
    bilateral: true,
  },
  {
    id: 'SNc',
    allenId: 381,
    name: 'Substantia Nigra pars compacta',
    acronym: 'SNc',
    description:
      'Melanin-containing dopaminergic nucleus whose nigrostriatal projections are essential for voluntary movement initiation. Selective degeneration of SNc DA neurons is the hallmark of Parkinson disease.',
    surgicalNotes:
      'Center at AP -3.2, ML 1.5, DV -4.2 from bregma. Lateral to VTA; the two are distinguished by ML coordinate. Use TH immunostaining or DAT-Cre mice for specific targeting. Pars reticulata lies ventral.',
    connections: ['CP', 'GPe', 'VTA', 'TH'],
    group: 'midbrain',
    color: '#D35400',
    position: [-3.2, 1.5, -4.2],
    geometryParams: {
      shape: 'blob',
      radii: [0.6, 0.35, 0.25],
      rotation: [0.1, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 2.0,
    },
    bilateral: true,
  },
  {
    id: 'PAG',
    allenId: 795,
    name: 'Periaqueductal Gray',
    acronym: 'PAG',
    description:
      'Midbrain structure surrounding the cerebral aqueduct that coordinates defensive behaviors (fight, flight, freeze), endogenous analgesia via descending pain modulation, and vocalization.',
    surgicalNotes:
      'Center at AP -4.0, ML 0.3, DV -2.5 from bregma. Surrounds the aqueduct; approach from dorsal surface at steep angle. Columns (dorsal, lateral, ventrolateral) have distinct functions — specify target column.',
    connections: ['CEA', 'PVH', 'HY', 'LC'],
    group: 'midbrain',
    color: '#F39C12',
    position: [-4.0, 0.3, -2.5],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [0.8, 0.4, 0.4],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 1.8,
    },
    bilateral: false,
  },
  {
    id: 'SCm',
    allenId: 294,
    name: 'Superior Colliculus, motor layers',
    acronym: 'SCm',
    description:
      'Deep layers of the superior colliculus generating orienting movements including saccades, head turns, and whisker movements toward salient stimuli. Receives converging visual, auditory, and somatosensory input.',
    surgicalNotes:
      'Center at AP -3.8, ML 1.0, DV -1.8 from bregma. Dorsal midbrain structure; accessible from above after removing overlying cortex or through a small craniotomy near lambda. Motor layers are deep (>0.5 mm from surface).',
    connections: ['VIS', 'PAG', 'TH', 'SNc'],
    group: 'midbrain',
    color: '#E74C3C',
    position: [-3.8, 1.0, -1.8],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [0.8, 0.7, 0.4],
      rotation: [0.15, 0, 0],
      noiseAmplitude: 0.05,
      noiseFrequency: 1.8,
    },
    bilateral: true,
  },

  // ──────────────────────────────────────────────
  // HINDBRAIN (2)
  // ──────────────────────────────────────────────
  {
    id: 'CB',
    allenId: 512,
    name: 'Cerebellum',
    acronym: 'CB',
    description:
      'Contains more than half of all brain neurons. Purkinje cells integrate massive parallel fiber and climbing fiber inputs to calibrate motor timing, coordination, and motor learning. Increasingly recognized for cognitive and affective roles.',
    surgicalNotes:
      'Center at AP -6.5, ML 0.0, DV -2.0 from bregma. Large posterior structure; for vermis target midline, for hemispheres offset laterally. Overlying transverse sinus must be avoided during exposure. Lobule-specific targeting requires careful AP/DV coordinates.',
    connections: ['MOp', 'TH', 'VIS', 'SCm'],
    group: 'hindbrain',
    color: '#16A085',
    position: [-6.5, 0.0, -2.0],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [2.0, 2.5, 1.5],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.1,
      noiseFrequency: 1.2,
    },
    bilateral: true,
  },
  {
    id: 'LC',
    allenId: 147,
    name: 'Locus Coeruleus',
    acronym: 'LC',
    description:
      'Small pontine nucleus and the brain\'s primary source of norepinephrine. Despite containing only ~1,500 neurons per side in mouse, LC axons innervate virtually the entire forebrain, modulating arousal, attention, and stress responses.',
    surgicalNotes:
      'Center at AP -5.4, ML 0.9, DV -3.7 from bregma. Tiny nucleus (~0.2 mm diameter); stereotaxic precision is critical. TH+ neurons cluster near the fourth ventricle floor. Use small volumes (25-50 nL) and slow injection rates to avoid spread.',
    connections: ['PAG', 'PL', 'HIP', 'CB'],
    group: 'hindbrain',
    color: '#1ABC9C',
    position: [-5.4, 0.9, -3.7],
    geometryParams: {
      shape: 'ellipsoid',
      radii: [0.15, 0.1, 0.12],
      rotation: [0, 0, 0],
      noiseAmplitude: 0.02,
      noiseFrequency: 3.0,
    },
    bilateral: true,
  },
];

// Apply official Allen Brain Atlas colors
for (const region of BRAIN_REGIONS) {
  if (ALLEN_COLORS[region.id]) {
    region.color = ALLEN_COLORS[region.id];
  }
}

/** Look up any region by its ID (Allen acronym) in O(1) time. */
export const REGION_MAP: Record<string, BrainRegion> = Object.fromEntries(
  BRAIN_REGIONS.map((r) => [r.id, r]),
);

/** Region IDs grouped by anatomical group for quick iteration. */
export const REGION_GROUPS: Record<string, string[]> = BRAIN_REGIONS.reduce<
  Record<string, string[]>
>((acc, r) => {
  if (!acc[r.group]) {
    acc[r.group] = [];
  }
  acc[r.group].push(r.id);
  return acc;
}, {});
