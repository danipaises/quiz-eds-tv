/* ============================================================
   DropNotification — Itens dropados ao derrotar chefe
   ============================================================ */
import { theme } from '../styles/theme';

const typeIcons = { weapon: '⚔️', armor: '🛡️', mana: '💧' };

export default function DropNotification({ drops, onClose }) {
  if (!drops || drops.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: '#14141e',
        border: `2px solid ${theme.colors.gold}`,
        borderRadius: '20px',
        padding: '32px',
        textAlign: 'center',
        maxWidth: '420px',
        boxShadow: theme.shadows.glow(theme.colors.gold),
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎁</div>
        <h2 style={{ color: theme.colors.gold, fontFamily: theme.fonts.heading, margin: '0 0 4px' }}>
          Itens Droppados!
        </h2>
        <p style={{ color: theme.colors.textMuted, fontSize: '0.85rem', margin: '0 0 20px' }}>
          O monstro derrubou itens! Eles serão distribuídos entre os grupos.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {drops.map((drop, i) => (
            <div key={drop.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: '#1a1a2e', borderRadius: '10px', padding: '12px 16px',
              border: '1px solid #2a2a4e',
              animation: i % 2 === 0 ? undefined : undefined,
            }}>
              <span style={{ fontSize: '1.5rem' }}>{typeIcons[drop.type] || '📦'}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: theme.colors.text, fontWeight: 700, fontSize: '0.95rem' }}>{drop.name}</div>
                <div style={{ color: theme.colors.textMuted, fontSize: '0.75rem', textTransform: 'capitalize' }}>{drop.type === 'weapon' ? 'Arma' : drop.type === 'armor' ? 'Armadura' : 'Poção de Tinta'}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '12px 32px',
            borderRadius: '10px',
            border: `1px solid ${theme.colors.gold}`,
            background: `${theme.colors.gold}22`,
            color: theme.colors.gold,
            fontWeight: 800,
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Continuar ▶
        </button>
      </div>
    </div>
  );
}
