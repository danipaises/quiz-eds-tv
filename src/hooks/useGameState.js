/* ============================================================
   useGameState — Motor central do jogo
   Gerencia grupos, monstros, ondas, batalha e sincronização
   ============================================================ */
import { useReducer, useCallback, useEffect, useRef } from 'react';
import { gameConfig, waves } from '../styles/theme';
import { getRandomQuestion } from '../data/questions';

/* ─── Estado Inicial ─── */
const createInitialGroup = (id) => ({
  id,
  name: `Grupo ${id + 1}`,
  hp: gameConfig.INITIAL_HP,
  maxHp: gameConfig.INITIAL_HP,
  mana: gameConfig.INITIAL_MANA,
  maxMana: gameConfig.INITIAL_MANA,
  xp: 0,
  level: 1,
  alive: true,
  attackPower: gameConfig.STANDARD_DAMAGE,
  defense: 0,
  items: [],
  lastAction: null,
  answeredQuestions: [],
});

const createInitialWave = (waveIndex) => {
  const w = waves[waveIndex];
  return {
    ...w,
    currentHp: w.hp,
    maxHp: w.hp,
    defeated: false,
  };
};

const initialState = {
  groups: Array.from({ length: gameConfig.MAX_GROUPS }, (_, i) => createInitialGroup(i)),
  currentWave: 0,
  monster: createInitialWave(0),
  gameStatus: 'waiting', // waiting | playing | won | lost
  battleLog: [{ text: '🎮 Jogo preparado. Conectem os tablets!', type: 'system' }],
  waveTransition: false,
  drops: [],
  connectedGroups: new Set(),
};

/* ─── Actions ─── */
function gameReducer(state, action) {
  switch (action.type) {
    case 'CONNECT_GROUP': {
      const newConnected = new Set(state.connectedGroups);
      newConnected.add(action.groupId);
      const groups = state.groups.map(g =>
        g.id === action.groupId
          ? { ...g, lastAction: { text: '📱 Conectado!', type: 'connect' } }
          : g
      );
      return { ...state, connectedGroups: newConnected, groups };
    }

    case 'STANDARD_ATTACK': {
      const { groupId, damage: bonusDamage } = action;
      const group = state.groups[groupId];
      if (!group || !group.alive) return state;

      const damage = group.attackPower + (bonusDamage || 0);
      const newMana = Math.min(group.mana + gameConfig.MANA_REGEN, group.maxMana);
      const newMonsterHp = Math.max(0, state.monster.currentHp - damage);

      const newGroups = [...state.groups];
      newGroups[groupId] = {
        ...group,
        mana: newMana,
        lastAction: { text: `⚔️ Ataque padrão causou ${damage} de dano!`, type: 'attack' },
      };

      const newLog = [{ text: `🔹 ${group.name} atacou! ${damage} de dano.`, type: 'attack' }, ...state.battleLog].slice(0, 50);

      return {
        ...state,
        groups: newGroups,
        monster: { ...state.monster, currentHp: newMonsterHp },
        battleLog: newLog,
      };
    }

    case 'ARTISTIC_ATTACK': {
      const { groupId } = action;
      const group = state.groups[groupId];
      if (!group || !group.alive || group.mana < gameConfig.ARTISTIC_COST) return state;

      const damage = gameConfig.ARTISTIC_DAMAGE + group.attackPower;
      const newMana = group.mana - gameConfig.ARTISTIC_COST;
      const newMonsterHp = Math.max(0, state.monster.currentHp - damage);

      const newGroups = [...state.groups];
      newGroups[groupId] = {
        ...group,
        mana: newMana,
        lastAction: { text: `🎨 ATAQUE ARTÍSTICO causou ${damage} de dano! -20 Tinta`, type: 'artistic' },
      };

      const newLog = [{ text: `🎨 ${group.name} usou Ataque Artístico! ${damage} de dano!`, type: 'artistic' }, ...state.battleLog].slice(0, 50);

      return {
        ...state,
        groups: newGroups,
        monster: { ...state.monster, currentHp: newMonsterHp },
        battleLog: newLog,
      };
    }

    case 'ANSWER_CORRECT': {
      const { groupId, xpGained } = action;
      const group = state.groups[groupId];
      if (!group || !group.alive) return state;

      const newXp = group.xp + xpGained;
      const xpNeeded = group.level * gameConfig.XP_PER_LEVEL;
      let newLevel = group.level;
      let remainingXp = newXp;

      if (newXp >= xpNeeded) {
        newLevel = group.level + 1;
        remainingXp = newXp - xpNeeded;
      }

      const newGroups = [...state.groups];
      newGroups[groupId] = {
        ...group,
        xp: remainingXp,
        level: newLevel,
        attackPower: group.attackPower + (newLevel > group.level ? 2 : 0),
        defense: group.defense + (newLevel > group.level ? 1 : 0),
        maxHp: group.maxHp + (newLevel > group.level ? 10 : 0),
        hp: group.hp + (newLevel > group.level ? 10 : 0),
        answeredQuestions: [...group.answeredQuestions, action.questionId],
        lastAction: { text: newLevel > group.level ? `⬆️ Subiu para nível ${newLevel}!` : `✅ +${xpGained} XP`, type: 'levelup' },
      };

      const newLog = [{ text: `✅ ${group.name} acertou! +${xpGained} XP${newLevel > group.level ? ` e subiu para nível ${newLevel}!` : ''}`, type: 'success' }, ...state.battleLog].slice(0, 50);

      return { ...state, groups: newGroups, battleLog: newLog };
    }

    case 'ANSWER_WRONG': {
      const { groupId } = action;
      const group = state.groups[groupId];
      if (!group || !group.alive) return state;

      const damageTaken = Math.floor(Math.random() * 8) + 3;
      const newHp = Math.max(0, group.hp - damageTaken);
      const alive = newHp > 0;

      const newGroups = [...state.groups];
      newGroups[groupId] = {
        ...group,
        hp: newHp,
        alive,
        lastAction: { text: alive ? `❌ Errou! -${damageTaken} HP` : `💀 Grupo eliminado!`, type: 'damage' },
      };

      const newLog = [{ text: `❌ ${group.name} errou! Perdeu ${damageTaken} HP.${!alive ? ' ELIMINADO!' : ''}`, type: 'error' }, ...state.battleLog].slice(0, 50);

      // Check game over
      const allDead = newGroups.every(g => !g.alive);
      if (allDead) {
        return { ...state, groups: newGroups, gameStatus: 'lost', battleLog: [{ text: '💀 GAME OVER — Todos os grupos foram eliminados!', type: 'system' }, ...newLog] };
      }

      return { ...state, groups: newGroups, battleLog: newLog };
    }

    case 'MONSTER_DEFEATED': {
      const newWave = state.currentWave + 1;
      if (newWave >= waves.length) {
        return { ...state, gameStatus: 'won', battleLog: [{ text: '🏆 VITÓRIA! Todas as ondas foram derrotadas! Parabéns, artistas!', type: 'system' }, ...state.battleLog] };
      }

      // Generate drops
      const newDrops = generateDrops(state.monster.itemPool);

      return {
        ...state,
        currentWave: newWave,
        monster: createInitialWave(newWave),
        waveTransition: true,
        drops: newDrops,
        battleLog: [{ text: `🎉 Onda ${state.currentWave + 1} derrotada! Preparando Onda ${newWave + 1}...`, type: 'system' }, ...state.battleLog],
      };
    }

    case 'START_WAVE': {
      return { ...state, waveTransition: false, drops: [] };
    }

    case 'RESET_GAME': {
      return {
        ...initialState,
        groups: Array.from({ length: gameConfig.MAX_GROUPS }, (_, i) => createInitialGroup(i)),
        monster: createInitialWave(0),
        battleLog: [{ text: '🔄 Jogo reiniciado! Conectem os tablets!', type: 'system' }],
        connectedGroups: new Set(),
      };
    }

    default:
      return state;
  }
}

function generateDrops(itemPool) {
  if (!itemPool || itemPool.length === 0) return [];
  const numDrops = Math.floor(Math.random() * 3) + 1;
  const drops = [];
  for (let i = 0; i < numDrops; i++) {
    drops.push({
      id: `drop_${Date.now()}_${i}`,
      name: itemPool[Math.floor(Math.random() * itemPool.length)],
      type: ['weapon', 'armor', 'mana'][Math.floor(Math.random() * 3)],
    });
  }
  return drops;
}

/* ─── Hook Principal ─── */
export default function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const logRef = useRef(null);

  /* Avanço automático de onda */
  useEffect(() => {
    if (state.monster.currentHp <= 0 && !state.monster.defeated && state.gameStatus === 'playing') {
      dispatch({ type: 'MONSTER_DEFEATED' });
    }
  }, [state.monster.currentHp, state.monster.defeated, state.gameStatus]);

  /* Transição de onda automática */
  useEffect(() => {
    if (state.waveTransition) {
      const timer = setTimeout(() => dispatch({ type: 'START_WAVE' }), gameConfig.AUTO_ADVANCE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [state.waveTransition]);

  /* ─── Ações EXPORTADAS ─── */

  const startGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
    // Pequeno delay para reset, depois inicia
    setTimeout(() => {
      dispatch({ type: 'START_WAVE' });
      // Hack: forçar estado playing
      dispatch({ type: 'CONNECT_GROUP', groupId: -1 }); // dummy para acordar
    }, 100);
  }, []);

  const connectGroup = useCallback((groupId) => {
    dispatch({ type: 'CONNECT_GROUP', groupId });
  }, []);

  const standardAttack = useCallback((groupId, damage = 0) => {
    dispatch({ type: 'STANDARD_ATTACK', groupId, damage });
  }, []);

  const artisticAttack = useCallback((groupId) => {
    dispatch({ type: 'ARTISTIC_ATTACK', groupId });
  }, []);

  const answerCorrect = useCallback((groupId, xpGained, questionId) => {
    dispatch({ type: 'ANSWER_CORRECT', groupId, xpGained, questionId });
  }, []);

  const answerWrong = useCallback((groupId) => {
    dispatch({ type: 'ANSWER_WRONG', groupId });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // Verificar se o jogo precisa ser iniciado ao conectar primeiro tablet
  useEffect(() => {
    if (state.connectedGroups.size >= 1 && state.gameStatus === 'waiting') {
      // Auto-start quando o primeiro tablet conectar
      state.gameStatus = 'playing';
    }
  }, [state.connectedGroups.size, state.gameStatus]);

  return {
    state,
    startGame,
    connectGroup,
    standardAttack,
    artisticAttack,
    answerCorrect,
    answerWrong,
    resetGame,
    dispatch,
    waves,
  };
}
