import { useMemo } from 'react';
import { BRAIN_REGIONS } from '../atlas/regionData';
import { useAppStore } from '../store/useAppStore';

export function RegionList() {
  const searchQuery = useAppStore((s) => s.searchQuery);
  const selectedRegion = useAppStore((s) => s.selectedRegion);
  const setSelectedRegion = useAppStore((s) => s.setSelectedRegion);
  const visibleRegions = useAppStore((s) => s.visibleRegions);
  const toggleRegionVisibility = useAppStore((s) => s.toggleRegionVisibility);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return BRAIN_REGIONS;
    const q = searchQuery.toLowerCase();
    return BRAIN_REGIONS.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.group.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        Regions ({filtered.length})
      </div>
      <div style={styles.list}>
        {filtered.map((region) => {
          const isSelected = selectedRegion === region.id;
          const isVisible =
            visibleRegions.size === 0 || visibleRegions.has(region.id);
          return (
            <div
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              style={{
                ...styles.item,
                ...(isSelected ? styles.itemSelected : {}),
                opacity: isVisible ? 1 : 0.4,
              }}
            >
              <span
                style={{
                  ...styles.dot,
                  background: region.color,
                }}
              />
              <span style={styles.acronym}>{region.acronym}</span>
              <span style={styles.name}>{region.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRegionVisibility(region.id);
                }}
                style={styles.visToggle}
                title={isVisible ? 'Hide region' : 'Show region'}
              >
                {isVisible ? '👁' : '👁‍🗨'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
  },
  header: {
    padding: '8px 12px',
    color: '#8890a0',
    fontSize: '11px',
    fontFamily: "'Inter', sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    padding: '4px 0',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'background 0.15s',
    borderLeft: '3px solid transparent',
  },
  itemSelected: {
    background: 'rgba(100, 140, 255, 0.1)',
    borderLeftColor: '#648cff',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  acronym: {
    color: '#c0d0ff',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    minWidth: '36px',
  },
  name: {
    color: '#8890a0',
    fontSize: '11px',
    fontFamily: "'Inter', sans-serif",
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  visToggle: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    padding: '2px',
    opacity: 0.5,
  },
};
