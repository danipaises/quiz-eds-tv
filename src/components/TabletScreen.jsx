/* ============================================================
   TabletScreen — Interface do tablet/controle do grupo
   Botões de ataque, quiz e feedback visual
   ============================================================ */
import { useState, useCallback } from 'react';
import QuizModal from './QuizModal';
import ProgressBar from './ProgressBar';
import { gameConfig } from '../styles/theme';
import { theme } from '../styles/theme';

export default function TabletScreen({
  groupId,
  group,
  waveNumber,
  monsterName,
  onStandardAttack,
  onArtisticAttack,
}) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [actionType, setActionType] = useState(null); // 'standard' | 'artistic'
  const [feedback, setFeedback] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAttackClick = useCallback((type) => {
    if (!group?.alive || isAnimating) return;
    setActionType(type);

    if (type === 'artistic' && group.mana < gameConfig.ARTISTIC_COST) {
      setFeedback({ type: 'error', text: '💧 Tinta insuficiente! Precisa de 20 de Tinta.' });
      setTimeout(() => setFeedback(null), 2500);
      return;
    }

    setShowQuiz(true);
  }, [group, isAnimating]);

  const handleCorrect = useCallback((questionId) => {
    setShowQuiz(false);
    setIsAnimating(true);
    const xpGained = 15 + Math.floor(Math.random() * 10);

    if (actionType === 'artistic') {
      onArtisticAttack(groupId, questionId, xpGained);
    } else {
      const bonusDamage = Math.floor(Math.random() * 5) + 1;
      onStandardAttack(groupId, questionId, xpGained, bonusDamage);
    }

    setFeedback({ type: 'success', text: `✅ Correto! +${xpGained} XP!` });
    setTimeout(() => { setFeedback(null); setIsAnimating(false); }, 2000);
  }, [actionType, groupId, onStandardAttack, onArtisticAttack]);

  const handleWrong = useCallback(() => {
    setShowQuiz(false);
    setIsAnimating(true);
    onStandardAttack(groupId, null, 0, 0, true); // wrong answer = no damage
    setFeedback({ type: 'error', text: '❌ Errado! O grupo tomou dano!' });
    setTimeout(() => { setFeedback(null); setIsAnimating(false); }, 2500);
  }, [groupId, onStandardAttack]);

  const handleCloseQuiz = useCallback(() => {
    setShowQuiz(false);
    setActionType(null);
  }, []);

  if (!group) {
    return (
      <div style={styles.container}>
        <div style={{ color: theme.colors.danger, fontSize: '1.2rem', textAlign: 'center', padding: '40px' }}>
          Grupo não encontrado. ID inválido.
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5rem' }}>🎨</span>
          <div>
            <h1 style={{ color: theme.colors.text, fontSize: '1.1rem', margin: 0, fontFamily: theme.fonts.heading }}>
              {group.name}
            </h1>
            <span style={{ color: theme.colors.textMuted, fontSize: '0.7rem' }}>
              {group.alive ? `3-5 jogadores • Onda ${waveNumber + 1}/4` : '💀 Eliminado'}
            </span>
          </div>
        </div>
        {monsterName && (
          <div style={{
            padding: '4px 10px', borderRadius: '8px',
            background: `${theme.colors.danger}22`, color: theme.colors.danger,
            fontSize: '0.72rem', fontWeight: 700,
          }}>
            ⚔️ {monsterName}
          </div>
        )}
      </div>

      {/* Stats do Grupo */}
      <div style={styles.statsGrid}>
        <div style={styles.statBox}>
          <span style={{ color: theme.colors.healthBar, fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' }}>❤️ HP</span>
          <ProgressBar value={group.hp} max={group.maxHp} color={theme.colors.healthBar} height={14} />
          <span style={{ color: theme.colors.textMuted, fontSize: '0.7rem' }}>{Math.floor(group.hp)}/{group.maxHp}</span>
        </div>
        <div style={styles.statBox}>
          <span style={{ color: theme.colors.manaBar, fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' }}>💧 Tinta</span>
          <ProgressBar value={group.mana} max={group.maxMana} color={theme.colors.manaBar} height={14} />
          <span style={{ color: theme.colors.textMuted, fontSize: '0.7rem' }}>{Math.floor(group.mana)}/{group.maxMana}</span>
        </div>
        <div style={styles.statBox}>
          <span style={{ color: theme.colors.gold, fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' }}>⭐ Nível</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '4px 0' }}>
            <span style={{ color: theme.colors.gold, fontWeight: 900, fontSize: '1.5rem' }}>{group.level}</span>
            <div style={{ flex: 1 }}>
              <ProgressBar value={group.xp} max={group.level * gameConfig.XP_PER_LEVEL} color={theme.colors.gold} height={6} showValue={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div style={{
          padding: '12px 16px', borderRadius: '10px', marginTop: '10px',
          background: feedback.type === 'success' ? `${theme.colors.success}11` : `${theme.colors.danger}11`,
          border: `1px solid ${feedback.type === 'success' ? theme.colors.success : theme.colors.danger}44`,
          color: feedback.type === 'success' ? theme.colors.success : theme.colors.danger,
          fontWeight: 700, fontSize: '0.9rem',
          textAlign: 'center',
          animation: 'pulse 0.3s ease',
        }}>
          {feedback.text}
        </div>
      )}

      {/* Botões de Ação */}
      <div style={styles.actions}>
        <button
          onClick={() => handleAttackClick('standard')}
          disabled={!group.alive || isAnimating}
          style={{
            ...styles.actionBtn,
            borderColor: theme.colors.accent,
            color: theme.colors.accent,
            opacity: (!group.alive || isAnimating) ? 0.4 : 1,
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>⚔️</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Ataque Padrão</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Dano médio • +{gameConfig.MANA_REGEN} Tinta</div>
          </div>
        </button>

        <button
          onClick={() => handleAttackClick('artistic')}
          disabled={!group.alive || isAnimating || group.mana < gameConfig.ARTISTIC_COST}
          style={{
            ...styles.actionBtn,
            borderColor: theme.colors.purple,
            color: theme.colors.purple,
            opacity: (!group.alive || isAnimating || group.mana < gameConfig.ARTISTIC_COST) ? 0.4 : 1,
            background: group.mana >= gameConfig.ARTISTIC_COST ? `${theme.colors.purple}08` : undefined,
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>🎨</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Ataque Artístico</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Dano massivo • {gameConfig.ARTISTIC_COST} Tinta</div>
          </div>
        </button>
      </div>

      {/* Itens */}
      {group.items.length > 0 && (
        <div style={styles.itemsSection}>
          <span style={{ color: theme.colors.textMuted, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
            🎒 Itens
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {group.items.map((item, i) => (
              <span key={i} style={{
                padding: '4px 10px', borderRadius: '8px',
                background: '#1a1a2e', border: '1px solid #2a2a4e',
                color: theme.colors.textMuted, fontSize: '0.75rem',
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          waveNumber={waveNumber}
          answeredIds={group.answeredQuestions}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onClose={handleCloseQuiz}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: theme.colors.bg,
    padding: '16px',
    fontFamily: theme.fonts.primary,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    background: '#14141e',
    borderRadius: '14px',
    border: `1px solid ${theme.colors.border}`,
    marginBottom: '12px',
  },
  statsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '12px',
  },
  statBox: {
    background: '#14141e',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '10px',
    padding: '10px 14px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '12px',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    borderRadius: '14px',
    border: '1px solid',
    background: '#14141e',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: theme.fonts.primary,
    textAlign: 'left',
    width: '100%',
  },
  itemsSection: {
    marginTop: '12px',
    padding: '12px 16px',
    background: '#14141e',
    borderRadius: '10px',
    border: `1px solid ${theme.colors.border}`,
  },
};
