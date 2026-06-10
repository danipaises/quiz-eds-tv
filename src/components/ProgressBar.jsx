/* ============================================================
   Barra de Progresso Customizada
   ============================================================ */
export default function ProgressBar({ value, max, color, bgColor, height = 20, label = '', showValue = true }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const barColor = pct < 25 ? '#ff3355' : pct < 50 ? '#ffaa33' : color;

  return (
    <div style={{
      width: '100%',
      background: bgColor || '#1a1a2e',
      borderRadius: '10px',
      height: `${height}px`,
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #2a2a4e',
    }}>
      <div style={{
        width: `${pct}%`,
        height: '100%',
        background: `linear-gradient(90deg, ${barColor}88, ${barColor})`,
        borderRadius: '10px',
        transition: 'width 0.5s ease',
        boxShadow: `0 0 12px ${barColor}44`,
      }} />
      {showValue && (
        <span style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          fontWeight: 800,
          fontSize: `${height * 0.45}px`,
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          whiteSpace: 'nowrap',
        }}>
          {label || `${value}/${max}`}
        </span>
      )}
    </div>
  );
}
