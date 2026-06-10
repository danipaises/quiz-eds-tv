/* ============================================================
   ProjetorScreen — Interface do projetor central
   Mostra o monstro, placar dos grupos, log e QR Code
   ============================================================ */
import BattleLog from './BattleLog';
import DropNotification from './DropNotification';
import MonsterDisplay from './MonsterDisplay';
import ProgressBar from './ProgressBar';
import QRScreen from './QRScreen';
import Scoreboard from './Scoreboard';
import { theme } from '../styles/theme';

export default function ProjetorScreen({ gameState, onReset, onCloseDrops, waves }) {
  const { monster, currentWave, groups, connectedGroups, battleLog, drops, gameStatus, waveTransition } = gameState;

  const totalHp = groups.reduce((s, g) => s + g.hp, 0);
  const maxTotalHp = groups.reduce((s, g) => s + g.maxHp, 0);

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.8rem' }}>🎨</span>
          <div>
            <h1 style={{ color: theme.colors.text, fontFamily: theme.fonts.heading, fontSize: '1.3rem', margin: 0 }}>
              RPG das Artes — Batalha Épica
            </h1>
            <span style={{ color: theme.colors.textMuted, fontSize: '0.72rem' }}>
              Arte Contemporânea | Multiplayer | Tempo Real
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {gameStatus === 'won' && (
            <span style={{ color: theme.colors.gold, fontWeight: 900, fontSize: '1rem' }}>🏆 VITÓRIA!</span>
          )}
          {gameStatus === 'lost' && (
            <span style={{ color: theme.colors.danger, fontWeight: 900, fontSize: '1rem' }}>💀 GAME OVER</span>
          )}
          <button onClick={onReset} style={styles.resetBtn}>🔄 Reiniciar</button>
        </div>
      </header>

      <div style={styles.grid}>
        {/* Coluna Principal — Monstro + Log */}
        <div style={styles.mainCol}>
          {waveTransition ? (
            <div style={styles.waveTransition}>
              <div style={{ fontSize: '4rem', marginBottom: '12px' }}>⚔️</div>
              <h2 style={{ color: monster.color || theme.colors.gold, fontFamily: theme.fonts.heading, margin: '0 0 8px' }}>
                {monster.name}
              </h2>
              <p style={{ color: theme.colors.textMuted }}>A próxima onda está chegando...</p>
              <ProgressBar
                value={0}
                max={100}
                color={monster.color || theme.colors.accent}
                height={6}
                showValue={false}
              />
            </div>
          ) : gameStatus === 'won' ? (
            <div style={styles.victoryScreen}>
              <div style={{ fontSize: '5rem' }}>🏆</div>
              <h2 style={{ color: theme.colors.gold, fontFamily: theme.fonts.heading, margin: '8px 0', fontSize: '2rem' }}>
                VITÓRIA!
              </h2>
              <p style={{ color: theme.colors.textMuted, maxWidth: '400px', lineHeight: 1.6 }}>
                Todas as ondas foram derrotadas! A arte contemporânea venceu — a consciência ambiental, a resistência política e a memória cultural triunfaram!
              </p>
            </div>
          ) : gameStatus === 'lost' ? (
            <div style={styles.victoryScreen}>
              <div style={{ fontSize: '5rem' }}>💀</div>
              <h2 style={{ color: theme.colors.danger, fontFamily: theme.fonts.heading, margin: '8px 0', fontSize: '2rem' }}>
                GAME OVER
              </h2>
              <p style={{ color: theme.colors.textMuted, maxWidth: '400px', lineHeight: 1.6 }}>
                Todos os grupos foram eliminados. A arte precisa de vozes para continuar lutando — tente novamente!
              </p>
            </div>
          ) : (
            <>
              <MonsterDisplay
                monster={monster}
                waveIndex={currentWave}
                currentHp={monster.currentHp}
              />
              <div style={{ marginTop: '12px' }}>
                <BattleLog log={battleLog} />
              </div>
            </>
          )}
        </div>

        {/* Coluna Direita — Placar + QR */}
        <div style={styles.sideCol}>
          <QRScreen />
          <div style={{ marginTop: '12px' }}>
            <Scoreboard groups={groups} connectedGroups={connectedGroups} />
          </div>

          {/* HP Total dos grupos */}
          <div style={{ marginTop: '12px', padding: '12px', background: '#0d0d14', borderRadius: '12px', border: `1px solid ${theme.colors.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: theme.colors.textMuted, fontSize: '0.7rem', fontWeight: 700 }}>HP TOTAL DOS GRUPOS</span>
              <span style={{ color: theme.colors.healthBar, fontWeight: 800, fontSize: '0.8rem' }}>{totalHp}/{maxTotalHp}</span>
            </div>
            <ProgressBar value={totalHp} max={maxTotalHp} color={theme.colors.healthBar} height={8} showValue={false} />
          </div>
        </div>
      </div>

      {/* Drop Notification */}
      {drops.length > 0 && <DropNotification drops={drops} onClose={onCloseDrops} />}
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: theme.colors.bg,
    padding: '16px',
    fontFamily: theme.fonts.primary,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '12px 20px',
    background: '#14141e',
    borderRadius: '14px',
    border: `1px solid ${theme.colors.border}`,
  },
  resetBtn: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: `1px solid ${theme.colors.borderGlow}`,
    background: '#1a1a2e',
    color: theme.colors.textMuted,
    fontWeight: 700,
    fontSize: '0.8rem',
    cursor: 'pointer',
    fontFamily: theme.fonts.primary,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '16px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  mainCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  sideCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  waveTransition: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    textAlign: 'center',
    padding: '40px',
    background: 'linear-gradient(135deg, #14141e, #0d0d14)',
    borderRadius: '16px',
    border: `1px solid ${theme.colors.border}`,
  },
  victoryScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '500px',
    textAlign: 'center',
    padding: '40px',
    background: 'linear-gradient(135deg, #14141e, #0d0d14)',
    borderRadius: '16px',
    border: `1px solid ${theme.colors.border}`,
  },
};
