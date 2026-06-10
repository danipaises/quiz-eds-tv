/* ============================================================
   App — Roteamento via query parameter
   ?view=projetor (padrão) | ?view=tablet&groupId=0
   ============================================================ */
import { useEffect, useState, useCallback } from 'react';
import ProjetorScreen from './components/ProjetorScreen';
import TabletScreen from './components/TabletScreen';
import useGameState from './hooks/useGameState';

export default function App() {
  const [view, setView] = useState('projetor');
  const [groupId, setGroupId] = useState(0);

  const game = useGameState();
  const { state, connectGroup, standardAttack, artisticAttack, answerCorrect, answerWrong, resetGame } = game;

  // Ler query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('view') || 'projetor';
    setView(v);

    const g = parseInt(params.get('groupId')) || 0;
    if (g >= 0 && g < 10) {
      setGroupId(g);
      if (v === 'tablet') {
        connectGroup(g);
      }
    }
  }, [connectGroup]);

  const handleStandardAttack = useCallback((gId, qId, xp, dmgBonus, isWrong) => {
    if (isWrong) {
      answerWrong(gId);
    } else {
      standardAttack(gId, dmgBonus || 0);
      if (qId) answerCorrect(gId, xp || 15, qId);
    }
  }, [standardAttack, answerCorrect, answerWrong]);

  const handleArtisticAttack = useCallback((gId, qId, xp) => {
    artisticAttack(gId);
    if (qId) answerCorrect(gId, xp || 30, qId);
  }, [artisticAttack, answerCorrect]);

  const handleReset = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const handleCloseDrops = useCallback(() => {
    game.dispatch({ type: 'START_WAVE' });
  }, [game.dispatch]);

  if (view === 'tablet') {
    return (
      <TabletScreen
        groupId={groupId}
        group={state.groups[groupId]}
        waveNumber={state.currentWave}
        monsterName={state.monster?.name}
        onStandardAttack={handleStandardAttack}
        onArtisticAttack={handleArtisticAttack}
      />
    );
  }

  return (
    <ProjetorScreen
      gameState={state}
      onReset={handleReset}
      onCloseDrops={handleCloseDrops}
      waves={game.waves}
    />
  );
}
