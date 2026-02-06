import type { CSSProperties } from 'react';
import { REGION_HIERARCHY } from '../atlas/regionHierarchy';
import { REGION_MAP } from '../atlas/regionData';
import type { RegionHierarchyNode } from '../atlas/types';
import { useAppStore } from '../store/useAppStore';

interface TreeNodeProps {
  node: RegionHierarchyNode;
  depth: number;
  selectedRegion: string | null;
  hierarchyExpanded: Set<string>;
  toggleHierarchyNode: (nodeId: string) => void;
  setSelectedRegion: (regionId: string | null) => void;
}

function TreeNode({
  node,
  depth,
  selectedRegion,
  hierarchyExpanded,
  toggleHierarchyNode,
  setSelectedRegion,
}: TreeNodeProps) {
  const hasChildren = Boolean(node.children?.length);
  const isExpanded = hasChildren && hierarchyExpanded.has(node.id);
  const isSelected = Boolean(node.regionId && node.regionId === selectedRegion);
  const region = node.regionId ? REGION_MAP[node.regionId] : null;

  const handleClick = () => {
    if (hasChildren) {
      toggleHierarchyNode(node.id);
    }
    if (node.regionId) {
      setSelectedRegion(node.regionId);
    }
  };

  return (
    <li style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <button
        type="button"
        onClick={handleClick}
        style={{
          ...btnStyle,
          paddingLeft: 10 + depth * 14,
          background: isSelected ? 'rgba(100, 140, 255, 0.15)' : 'transparent',
          color: isSelected ? '#e0e8ff' : hasChildren ? '#b0b8c8' : '#8890a0',
          fontWeight: hasChildren ? 500 : 400,
        }}
      >
        {hasChildren && (
          <span style={{ fontSize: '8px', color: '#5a6478', width: '10px' }}>
            {isExpanded ? '▼' : '▶'}
          </span>
        )}
        {region && (
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: region.color,
              flexShrink: 0,
            }}
          />
        )}
        <span style={{ fontSize: hasChildren ? '12px' : '11px' }}>
          {node.label}
        </span>
      </button>

      {hasChildren && isExpanded && (
        <ul style={{ margin: 0, padding: 0 }}>
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedRegion={selectedRegion}
              hierarchyExpanded={hierarchyExpanded}
              toggleHierarchyNode={toggleHierarchyNode}
              setSelectedRegion={setSelectedRegion}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const btnStyle: CSSProperties = {
  width: '100%',
  border: 'none',
  background: 'transparent',
  textAlign: 'left',
  padding: '5px 10px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  fontFamily: "'Inter', sans-serif",
  transition: 'background 0.1s',
};

export default function HierarchyBrowser() {
  const selectedRegion = useAppStore((s) => s.selectedRegion);
  const hierarchyExpanded = useAppStore((s) => s.hierarchyExpanded);
  const toggleHierarchyNode = useAppStore((s) => s.toggleHierarchyNode);
  const setSelectedRegion = useAppStore((s) => s.setSelectedRegion);

  return (
    <div style={{ padding: '4px 0' }}>
      <div style={headerStyle}>Anatomical Ontology</div>
      <ul style={{ margin: 0, padding: 0 }}>
        {REGION_HIERARCHY.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            selectedRegion={selectedRegion}
            hierarchyExpanded={hierarchyExpanded}
            toggleHierarchyNode={toggleHierarchyNode}
            setSelectedRegion={setSelectedRegion}
          />
        ))}
      </ul>
    </div>
  );
}

const headerStyle: CSSProperties = {
  padding: '8px 12px 6px',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#6a7080',
};
