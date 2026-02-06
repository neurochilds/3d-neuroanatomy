import { useAppStore } from '../store/useAppStore';
import { BrainCanvas } from '../scene/BrainCanvas';
import { Toolbar } from './Toolbar';
import InfoPanel from './InfoPanel';
import HierarchyBrowser from './HierarchyBrowser';
import SearchBar from './SearchBar';
import { QuizEngine } from '../quiz/QuizEngine';

export function Layout() {
  const appMode = useAppStore((s) => s.appMode);
  const selectedRegion = useAppStore((s) => s.selectedRegion);
  const setSelectedRegion = useAppStore((s) => s.setSelectedRegion);

  return (
    <div style={styles.root}>
      <Toolbar />
      <div style={styles.main}>
        <div style={styles.sidebar}>
          {appMode === 'teaching' ? (
            <>
              <SearchBar />
              <div style={styles.scrollArea}>
                {selectedRegion && (
                  <div style={styles.infoSection}>
                    <div style={styles.infoHeader}>
                      <span style={styles.infoTitle}>Region Details</span>
                      <button
                        onClick={() => setSelectedRegion(null)}
                        style={styles.closeBtn}
                      >
                        ✕
                      </button>
                    </div>
                    <InfoPanel />
                  </div>
                )}
                <HierarchyBrowser />
              </div>
            </>
          ) : (
            <QuizEngine />
          )}
        </div>
        <div style={styles.viewport}>
          <BrainCanvas />
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    background: '#0a0a1a',
    color: '#e0e4ec',
    fontFamily: "'Inter', system-ui, sans-serif",
    overflow: 'hidden',
  },
  main: {
    display: 'flex',
    flex: 1,
    minHeight: 0,
  },
  sidebar: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(12, 12, 28, 0.95)',
    borderRight: '1px solid rgba(255, 255, 255, 0.06)',
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    minHeight: 0,
  },
  infoSection: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    marginBottom: '4px',
  },
  infoHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    position: 'sticky',
    top: 0,
    background: 'rgba(12, 12, 28, 0.98)',
    zIndex: 1,
  },
  infoTitle: {
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#6a7080',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#6a7080',
    cursor: 'pointer',
    fontSize: '12px',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  viewport: {
    flex: 1,
    position: 'relative',
  },
};
