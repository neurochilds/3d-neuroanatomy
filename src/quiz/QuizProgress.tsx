import { useAppStore } from '../store/useAppStore';

export function QuizProgress() {
  const sessionScore = useAppStore((s) => s.sessionScore);
  const sessionAnswers = useAppStore((s) => s.sessionAnswers);
  const streak = useAppStore((s) => s.streak);
  const questionQueue = useAppStore((s) => s.questionQueue);
  const endQuiz = useAppStore((s) => s.endQuiz);

  const total = sessionAnswers.length + questionQueue.length + 1;
  const current = sessionAnswers.length + 1;
  const progress = (sessionAnswers.length / total) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progress}%`,
          }}
        />
      </div>
      <div style={styles.stats}>
        <span style={styles.stat}>
          Q {current}/{total}
        </span>
        <span style={styles.stat}>
          Score: {sessionScore}/{sessionAnswers.length}
        </span>
        {streak > 1 && (
          <span style={{ ...styles.stat, color: '#f39c12' }}>
            🔥 {streak}
          </span>
        )}
        <button style={styles.endBtn} onClick={endQuiz}>
          End
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  progressBar: {
    height: '4px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #648cff, #a855f7)',
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  stat: {
    fontSize: '11px',
    color: '#8890a0',
    fontFamily: "'Inter', sans-serif",
  },
  endBtn: {
    marginLeft: 'auto',
    padding: '3px 10px',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    background: 'transparent',
    color: '#8890a0',
    cursor: 'pointer',
    fontSize: '11px',
    fontFamily: "'Inter', sans-serif",
  },
};
