import { useAppStore } from '../store/useAppStore';
import type { AppMode } from '../atlas/types';

export function Toolbar() {
  const appMode = useAppStore((s) => s.appMode);
  const setAppMode = useAppStore((s) => s.setAppMode);
  const shellOpacity = useAppStore((s) => s.shellOpacity);
  const setShellOpacity = useAppStore((s) => s.setShellOpacity);
  const showLabels = useAppStore((s) => s.showLabels);
  const toggleLabels = useAppStore((s) => s.toggleLabels);
  const showBilateral = useAppStore((s) => s.showBilateral);
  const toggleBilateral = useAppStore((s) => s.toggleBilateral);

  return (
    <div style={styles.toolbar}>
      <div style={styles.modeToggle}>
        {(['teaching', 'quiz'] as AppMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setAppMode(mode)}
            style={{
              ...styles.modeButton,
              ...(appMode === mode ? styles.modeButtonActive : {}),
            }}
          >
            {mode === 'teaching' ? '🔬 Explore' : '📝 Quiz'}
          </button>
        ))}
      </div>

      <div style={styles.control}>
        <label style={styles.label}>Shell Opacity</label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={shellOpacity}
          onChange={(e) => setShellOpacity(parseFloat(e.target.value))}
          style={styles.slider}
        />
      </div>

      <div style={styles.control}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={showLabels}
            onChange={toggleLabels}
            style={styles.checkbox}
          />
          Labels
        </label>
      </div>

      <div style={styles.control}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={showBilateral}
            onChange={toggleBilateral}
            style={styles.checkbox}
          />
          Bilateral
        </label>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '8px 16px',
    background: 'rgba(15, 15, 30, 0.95)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(12px)',
    zIndex: 10,
  },
  modeToggle: {
    display: 'flex',
    gap: '4px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    padding: '2px',
  },
  modeButton: {
    padding: '6px 14px',
    border: 'none',
    borderRadius: '6px',
    background: 'transparent',
    color: '#8890a0',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s',
  },
  modeButtonActive: {
    background: 'rgba(100, 140, 255, 0.2)',
    color: '#c0d0ff',
  },
  control: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  label: {
    color: '#8890a0',
    fontSize: '12px',
    fontFamily: "'Inter', sans-serif",
  },
  slider: {
    width: '80px',
    accentColor: '#648cff',
  },
  checkboxLabel: {
    color: '#8890a0',
    fontSize: '12px',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
  },
  checkbox: {
    accentColor: '#648cff',
  },
};
