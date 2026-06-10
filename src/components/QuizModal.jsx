/* ============================================================
   QuizModal — Pergunta de múltipla escolha para ataque
   ============================================================ */
import { useState, useEffect } from 'react';
import { getRandomQuestion } from '../data/questions';
import { gameConfig } from '../styles/theme';
import { theme } from '../styles/theme';

export default function QuizModal({ waveNumber, answeredIds, onCorrect, onWrong, onClose }) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const q = getRandomQuestion(waveNumber, answeredIds);
    setQuestion(q);
  }, [waveNumber, answeredIds]);

  // Timer
  useEffect(() => {
    if (showResult) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showResult]);

  function handleAnswer(index) {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    setTimeout(() => {
      if (index === question.correct) {
        onCorrect(question.id);
      } else {
        onWrong();
      }
    }, 2000);
  }

  if (!question) return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={{ color: theme.colors.textMuted, fontSize: '1.2rem' }}>Carregando questão...</div>
      </div>
    </div>
  );

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Timer */}
        <div style={styles.timerBar}>
          <div style={{
            ...styles.timerFill,
            width: `${(timeLeft / 20) * 100}%`,
            background: timeLeft < 5 ? theme.colors.danger : timeLeft < 10 ? theme.colors.warning : theme.colors.success,
          }} />
        </div>
        <div style={{ textAlign: 'right', color: timeLeft < 5 ? theme.colors.danger : theme.colors.textMuted, fontWeight: 700, fontSize: '0.85rem' }}>
          {timeLeft}s
        </div>

        {/* Tópico */}
        <div style={{
          display: 'inline-flex', padding: '4px 10px', borderRadius: '6px',
          background: `${theme.colors.purple}22`, color: theme.colors.purple,
          fontSize: '0.72rem', fontWeight: 700, marginBottom: '10px',
        }}>
          {question.topic}
        </div>

        {/* Pergunta */}
        <h3 style={{ color: theme.colors.text, fontSize: '1.05rem', lineHeight: 1.5, margin: '0 0 16px' }}>
          {question.question}
        </h3>

        {/* Opções */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {question.options.map((opt, i) => {
            let bg = '#1a1a2e';
            let border = '#2a2a4e';
            let color = theme.colors.text;

            if (showResult) {
              if (i === question.correct) {
                bg = `${theme.colors.success}22`;
                border = theme.colors.success;
                color = theme.colors.success;
              } else if (i === selected) {
                bg = `${theme.colors.danger}22`;
                border = theme.colors.danger;
                color = theme.colors.danger;
              } else {
                opacity = 0.4;
              }
            } else if (selected === i) {
              bg = `${theme.colors.accent}22`;
              border = theme.colors.accent;
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showResult}
                style={{
                  ...styles.option,
                  background: bg,
                  borderColor: border,
                  color,
                  cursor: showResult ? 'default' : 'pointer',
                  opacity: showResult && i !== question.correct && i !== selected ? 0.4 : 1,
                }}
              >
                <span style={{ fontWeight: 800, color: theme.colors.accentDim, marginRight: '8px' }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
                {showResult && i === question.correct && <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>✅</span>}
                {showResult && i === selected && i !== question.correct && <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>❌</span>}
              </button>
            );
          })}
        </div>

        {/* Resultado */}
        {showResult && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '10px',
            background: selected === question.correct ? `${theme.colors.success}11` : `${theme.colors.danger}11`,
            border: `1px solid ${selected === question.correct ? theme.colors.success : theme.colors.danger}44`,
          }}>
            <div style={{ color: selected === question.correct ? theme.colors.success : theme.colors.danger, fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
              {selected === question.correct ? '✅ Correto!' : '❌ Errado!'}
            </div>
            <div style={{ color: theme.colors.textMuted, fontSize: '0.82rem', lineHeight: 1.5 }}>
              {question.explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(0,0,0,0.8)',
    zIndex: 1000,
    padding: '16px',
    backdropFilter: 'blur(6px)',
  },
  container: {
    width: '100%',
    maxWidth: '520px',
    background: '#14141e',
    border: `1px solid ${theme.colors.borderGlow}`,
    borderRadius: '20px',
    padding: '24px',
    boxShadow: theme.shadows.glow(),
  },
  timerBar: {
    width: '100%',
    height: '4px',
    background: '#1a1a2e',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '4px',
  },
  timerFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 1s linear, background 0.5s',
  },
  option: {
    width: '100%',
    textAlign: 'left',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #2a2a4e',
    background: '#1a1a2e',
    fontSize: '0.88rem',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
    fontFamily: "'Courier New', monospace",
  },
};
