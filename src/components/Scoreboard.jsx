/* ============================================================
   Scoreboard — Placar dos 10 grupos no projetor
   ============================================================ */
import { theme } from '../styles/theme';

function GroupCard({ group, isConnected }) {
  const hpPct = (group.hp / group.maxHp) * 100;
  const hpColor = hpPct < 25 ? theme.colors.danger : hpPct < 60 ? theme.colors.warning : theme.colors.success;

  return (
    <div style={{
      background: group.alive ? '#14141e' : '#1a0a0e',
      border: `1px solid ${group.alive ? (isConnected ? '#2a4a3e' : '#2a2a3e') : '#3a1a1e'}`,
      borderRadius: '10px',
      padding: '10px 12px',
      opacity: group.alive ? 1 : 0.5,
      transition: theme.transitions,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{
          color: group.alive ? theme.colors.text : theme.colors.textDim,
          fontWeight: 700,
          fontSize: '0.78rem',
        }}>
          {isConnected ? '📱' : '📴'} {group.name}
        </span>
        <span style={{
          color: hpColor,
          fontWeight: 800,
          fontSize: '0.75rem',
        }}>
          ❤️ {group.hp}
        </span>
      </div>

      {/* Mini HP bar */}
      <div style={{
        width: '100%', height: '4px',
        background: '#1a1a2e', borderRadius: '4px', overflow: 'hidden', marginBottom: '6px',
      }}>
        <div style={{
          width: `${Math.max(0, hpPct)}%`, height: '100%',
          background: hpColor, borderRadius: '4px',
          transition: 'width 0.4s ease',
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
        <span style={{ color: theme.colors.manaBar }}>💧 {Math.floor(group.mana)}</span>
        <span style={{ color: theme.colors.gold }}>⭐ Lv.{group.level}</span>
        <span style={{ color: group.alive ? theme.colors.textMuted : theme.colors.dangerDim }}>
          {group.alive ? `⚔️ ${group.attackPower}` : '💀'}
        </span>
      </div>
    </div>
  );
}

export default function Scoreboard({ groups, connectedGroups }) {
  return (
    <div style={{
      background: '#0d0d14',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '16px',
      padding: '16px',
    }}>
      <div style={{
        color: theme.colors.textMuted,
        fontSize: '0.7rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginBottom: '10px',
        textAlign: 'center',
      }}>
        📊 Placar — {connectedGroups.size}/{groups.length} Conectados
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '6px',
      }}>
        {groups.map(g => (
          <GroupCard key={g.id} group={g} isConnected={connectedGroups.has(g.id)} />
        ))}
      </div>
    </div>
  );
}
