# 🎨 RPG das Artes — Batalha Épica

**Jogo de RPG Educacional Multiplayer em tempo real** sobre **Artes Contemporâneas**.

## 🎯 Conceito

4 jogadores/grupos enfrentam ondas de inimigos inspirados em artistas contemporâneos. Para atacar, os grupos precisam responder perguntas de múltipla escolha sobre os temas:

- **Onda 1** 🌳🔥 — Frans Krajcberg (Arte Ambiental)
- **Onda 2** 🧊⏰ — Olafur Eliasson (Mudanças Climáticas)
- **Onda 3** 🤖📸 — HA Schult & Ai Weiwei (Consumismo & Vigilância)
- **Onda 4** 🧵✊ — Arpilleras Chilenas (Resistência Política)

## 🚀 Como Usar

### Projetor (Tela Central)
```
http://localhost:5173/?view=projetor
```
Mostra o monstro, placar dos grupos, log de batalha e QR Code.

### Tablet (Controle do Grupo)
```
http://localhost:5173/?view=tablet&groupId=0
```
Substitua `groupId=0` por `0-9` para cada grupo. Até **10 tablets** simultâneos.

### Conexão via QR Code
Na tela do projetor, um QR Code é gerado automaticamente com o link para o tablet.

## 🎮 Regras do Jogo

| Mecânica | Descrição |
|----------|-----------|
| **Ataque Padrão** | Causa dano regular, não consome Tinta (mana), recupera +3 de Tinta |
| **Ataque Artístico** | Causa dano massivo (35), consome 20 de Tinta |
| **Quiz** | Pergunta aparece ao atacar. Acertar = dano + XP. Errar = grupo toma dano |
| **Progressão** | XP acumulado sobe o nível do grupo, aumentando ataque, defesa e HP |
| **Drops** | Inimigos derrotados dropam itens (armas, armaduras, poções) |
| **Game Over** | Se TODOS os grupos morrerem, o jogo acaba |

## 🧱 Stack

- React 19 + Vite
- CSS-in-JS (inline styles)
- QRCode.react
- Roteamento via query params
- Estado via useReducer

## 📦 Desenvolvimento

```bash
npm install
npm run dev
```
