/* ============================================================
   BattleLog — Log de ações em tempo real
   ============================================================ */
import { useEffect, useRef } from 'react';

const typeColors = {
  attack: '#ff6633',
  artistic: '#aa44ff',
  success: '#33ff77',
  error: '#ff3355',
  levelup: '#ffd700',
  system: '#00f0ff',
  connect: '#33ff77',
  damage: '#ff3355',
};

export default function BattleLog({ log }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [log]);

  return (
    <div style={{
      background: '#0d0d14',
      border: '1px solid #2a2a3e',
      borderRadius: '12px',
      padding: '12px',
      height: '200px',
      overflowY: 'auto',
      fontFamily: "'Courier New', monospace",
      fontSize: '0.78rem',
    }}>
      {log.length === 0 && (
        <div style={{ color: '#5a5a70', padding: '8px' }}>Nenhuma ação ainda...</div>
      )}
      {log.map((entry, i) => (
        <div key={i} style={{
          color: typeColors[entry.type] || '#8888a0',
          padding: '3px 0',
          borderBottom: i < log.length - 1 ? '1px solid #1a1a2a' : 'none',
          opacity: i === 0 ? 1 : Math.max(0.4, 1 - i * 0.02),
        }}>
          {entry.text}
        </div>
      ))}
    </div>
  );
}
