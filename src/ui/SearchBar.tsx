import { useMemo } from 'react';
import { atlas } from '../atlas/MouseAtlasAdapter';
import { useAppStore } from '../store/useAppStore';

export default function SearchBar() {
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const setSelectedRegion = useAppStore((s) => s.setSelectedRegion);

  const results = useMemo(() => atlas.search(searchQuery), [searchQuery]);
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <div style={styles.container}>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search regions..."
        style={styles.input}
      />
      {hasQuery && (
        <div style={styles.results}>
          {results.length === 0 ? (
            <div style={styles.noResults}>No matches</div>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRegion(r.id);
                  setSearchQuery('');
                }}
                style={styles.resultItem}
              >
                <span style={{ ...styles.badge, background: r.color + '30', color: r.color }}>
                  {r.acronym}
                </span>
                <span style={styles.resultName}>{r.name}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '8px 10px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '7px 10px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    color: '#e0e4ec',
    fontSize: '12px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  },
  results: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 20,
    background: 'rgba(14, 14, 30, 0.98)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderTop: 'none',
    maxHeight: '240px',
    overflowY: 'auto',
  },
  noResults: {
    padding: '10px 12px',
    fontSize: '11px',
    color: '#6a7080',
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '6px 12px',
    border: 'none',
    background: 'transparent',
    color: '#e0e4ec',
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: "'Inter', sans-serif",
    textAlign: 'left',
  },
  badge: {
    fontSize: '10px',
    fontWeight: 700,
    padding: '1px 6px',
    borderRadius: '3px',
    minWidth: '32px',
    textAlign: 'center',
  },
  resultName: {
    fontSize: '11px',
    color: '#8890a0',
  },
};
