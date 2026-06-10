/* ============================================================
   MonsterDisplay — Monstro da onda atual com HP e animação
   ============================================================ */
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { theme } from '../styles/theme';

const monsterEmojis = ['🌳🔥', '🧊⏰', '🤖📸', '🧵✊'];

export default function MonsterDisplay({ monster, waveIndex, currentHp }) {
  const [shake, setShake] = useState(false);
  const pct = Math.max(0, (currentHp / monster.maxHp) * 100);

  useEffect(() => {
    if (currentHp < monster.maxHp) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 400);
      return () => clearTimeout(timer);
    }
  }, [currentHp, monster.maxHp]);

  const color = pct < 25 ? theme.colors.danger : pct < 50 ? theme.colors.warning : theme.colors.accent;

  return (
    <div style={{
      background: `linear-gradient(135deg, #14141e, #0d0d14)`,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '16px',
      padding: '20px 24px',
      boxShadow: theme.shadows.card,
    }}>
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.8rem' }}>{monster.emojis || monsterEmojis[waveIndex] || '👾'}</span>
            <div>
              <div style={{ color: theme.colors.text, fontWeight: 800, fontSize: '1.15rem' }}>
                {monster.name}
              </div>
              <div style={{ color: monster.color || color, fontSize: '0.8rem', fontWeight: 600 }}>
                {monster.inspiration}
              </div>
            </div>
          </div>
        </div>
        <div style={{
          background: `${color}22`,
          border: `1px solid ${color}44`,
          borderRadius: '8px',
          padding: '4px 12px',
          color,
          fontWeight: 800,
          fontSize: '0.85rem',
        }}>
          Onda {waveIndex + 1}/4
        </div>
      </div>

      {/* Descrição */}
      <div style={{
        color: theme.colors.textMuted,
        fontSize: '0.82rem',
        lineHeight: 1.5,
        marginBottom: '14px',
        fontStyle: 'italic',
        borderLeft: `2px solid ${color}44`,
        paddingLeft: '12px',
      }}>
        {monster.description}
      </div>

      {/* HP */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ color: theme.colors.danger, fontWeight: 800, fontSize: '0.75rem' }}>HP</span>
        <div style={{ flex: 1 }}>
          <ProgressBar
            value={currentHp}
            max={monster.maxHp}
            color={color}
            height={22}
          />
        </div>
      </div>

      {/* XP / Gold */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.85rem' }}>⭐</span>
          <span style={{ color: theme.colors.gold, fontWeight: 700, fontSize: '0.85rem' }}>+{monster.xpReward} XP</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.85rem' }}>🪙</span>
          <span style={{ color: theme.colors.warning, fontWeight: 700, fontSize: '0.85rem' }}>+{monster.goldReward} Ouro</span>
        </div>
      </div>
    </div>
  );
}
