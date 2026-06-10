/* ============================================================
   BANCO DE QUESTÕES — Artes Contemporâneas
   Cada pergunta tem 4 alternativas, índice da correta (0-3),
   e tópico de referência.
   ============================================================ */
const questions = [
  // ─── FRANS KRAJCBERG ───
  {
    id: 'k1',
    topic: 'Frans Krajcberg',
    wave: [1],
    question: 'Qual era o principal material utilizado por Frans Krajcberg em suas esculturas?',
    options: [
      'Mármore e granito italiano',
      'Troncos carbonizados e raízes de árvores queimadas',
      'Metal reciclado de indústrias',
      'Plástico derretido de garrafas PET',
    ],
    correct: 1,
    explanation: 'Krajcberg usava troncos carbonizados de queimadas como matéria-prima, transformando a destruição ambiental em arte.',
  },
  {
    id: 'k2',
    topic: 'Frans Krajcberg',
    wave: [1],
    question: 'Qual causa ambiental Frans Krajcberg defendia com mais veemência?',
    options: [
      'A preservação dos oceanos',
      'O combate ao desmatamento da Amazônia e da Mata Atlântica',
      'A proteção dos ursos polares',
      'A reciclagem de lixo urbano',
    ],
    correct: 1,
    explanation: 'Krajcberg era um ativista ferrenho contra o desmatamento, especialmente na Amazônia e Mata Atlântica.',
  },
  {
    id: 'k3',
    topic: 'Frans Krajcberg',
    wave: [1],
    question: 'Como Frans Krajcberg chamava suas obras feitas com elementos naturais?',
    options: [
      'Naturezas-mortas contemporâneas',
      'Esculturas de sobrevivência',
      'Manifestos ambientais esculpidos',
      'Sua obra não tinha nome específico',
    ],
    correct: 1,
    explanation: 'Krajcberg chamava suas obras de "Esculturas de Sobrevivência", um grito contra a destruição da natureza.',
  },
  {
    id: 'k4',
    topic: 'Frans Krajcberg',
    wave: [1],
    question: 'Frans Krajcberg se exilou do Brasil em determinado período. Para onde foi e por quê?',
    options: [
      'França, para estudar belas-artes em Paris',
      'Estados Unidos, para fugir da ditadura militar brasileira',
      'Japão, para aprender técnicas de cerâmica',
      'Espanha, para trabalhar com Picasso',
    ],
    correct: 1,
    explanation: 'Krajcberg se exilou nos EUA durante a ditadura militar, pois sua arte de denúncia ambiental também era vista como subversiva.',
  },
  {
    id: 'k5',
    topic: 'Frans Krajcberg',
    wave: [1],
    question: 'Qual elemento NÃO fazia parte da estética de Frans Krajcberg?',
    options: [
      'Cores vibrantes e formas geométricas abstratas',
      'Texturas ásperas de madeira queimada',
      'Cores terrosas e tons de cinza',
      'Formas orgânicas e irregulares',
    ],
    correct: 0,
    explanation: 'Krajcberg evitava cores vibrantes e formas geométricas — sua paleta era terrosa, com tons de cinza, preto e marrom.',
  },

  // ─── OLAFUR ELIASSON ───
  {
    id: 'e1',
    topic: 'Olafur Eliasson',
    wave: [2],
    question: 'Qual instalação famosa de Olafur Eliasson colocou o sol dentro de uma galeria?',
    options: [
      '"The Weather Project" (2003) na Tate Modern',
      '"Ice Watch" (2014) em Copenhagen',
      '"Your rainbow panorama" (2011) na Dinamarca',
      '"The New York City Waterfalls" (2008)',
    ],
    correct: 0,
    explanation: '"The Weather Project" criou um sol artificial dentro da Tate Modern usando centenas de lâmpadas monocromáticas e névoa.',
  },
  {
    id: 'e2',
    topic: 'Olafur Eliasson',
    wave: [2],
    question: 'O que a obra "Ice Watch" de Olafur Eliasson pretendia demonstrar?',
    options: [
      'A beleza das esculturas de gelo no inverno',
      'O derretimento das calotas polares devido às mudanças climáticas',
      'A técnica de preservação de alimentos no gelo',
      'A dança tradicional dos esquimós',
    ],
    correct: 1,
    explanation: '"Ice Watch" trouxe blocos de gelo da Groenlândia para praças públicas para que as pessoas pudessem testemunhar o derretimento.',
  },
  {
    id: 'e3',
    topic: 'Olafur Eliasson',
    wave: [2],
    question: 'Qual fenômeno natural Olafur Eliasson frequentemente recria em suas instalações?',
    options: [
      'Terremotos e maremotos',
      'Fenômenos atmosféricos como arco-íris, névoa e luz solar',
      'Erupções vulcânicas',
      'Ciclos lunares completos',
    ],
    correct: 1,
    explanation: 'Eliasson recria fenômenos atmosféricos (arco-íris, névoa, luz, água) para conectar o público com a experiência sensorial da natureza.',
  },
  {
    id: 'e4',
    topic: 'Olafur Eliasson',
    wave: [2],
    question: 'Além de artista, Olafur Eliasson também fundou um estúdio que:',
    options: [
      'Produz filmes de Hollywood',
      'Desenvolve projetos sustentáveis e pesquisas sobre mudanças climáticas',
      'Fábrica móveis de luxo',
      'Cria jogos educativos',
    ],
    correct: 1,
    explanation: 'O Studio Olafur Eliasson emprega arquitetos, engenheiros e cientistas que desenvolvem projetos sobre sustentabilidade e clima.',
  },
  {
    id: 'e5',
    topic: 'Olafur Eliasson',
    wave: [2],
    question: 'Na obra "Your rainbow panorama", o visitante:',
    options: [
      'Entra em um túnel de espelhos infinitos',
      'Caminha por um corredor circular de vidro colorido que cria um arco-íris panorâmico',
      'Veste capacetes de realidade virtual',
      'Observa projeções de auroras boreais',
    ],
    correct: 1,
    explanation: 'É um corredor circular de vidro com todas as cores do arco-íris, instalado no topo do Museu ARoS, na Dinamarca.',
  },

  // ─── HA SCHULT ───
  {
    id: 'h1',
    topic: 'HA Schult',
    wave: [3],
    question: 'Qual instalação mais famosa de HA Schult é feita inteiramente de lixo?',
    options: [
      '"Trash People" — figuras humanas em tamanho real feitas de lixo reciclado',
      '"The Garbage Monster" — uma criatura gigante de sucata',
      '"Plastic Ocean" — ondas feitas de garrafas PET',
      '"Waste Land" — um país inteiro de lixo',
    ],
    correct: 0,
    explanation: '"Trash People" consiste em centenas de figuras humanas feitas de latas, garrafas, computadores e outros resíduos.',
  },
  {
    id: 'h2',
    topic: 'HA Schult',
    wave: [3],
    question: 'Qual mensagem HA Schult busca transmitir com suas obras feitas de lixo?',
    options: [
      'Que o lixo pode ser belo se bem organizado',
      'Uma crítica à sociedade consumista que produz resíduos em excesso',
      'Que a arte deve ser feita apenas com materiais reciclados',
      'Uma celebração do consumo moderno',
    ],
    correct: 1,
    explanation: 'Schult critica o consumismo desenfreado e mostra que estamos nos transformando no lixo que produzimos.',
  },
  {
    id: 'h3',
    topic: 'HA Schult',
    wave: [3],
    question: 'Para onde as "Trash People" de HA Schult já viajaram?',
    options: [
      'Apenas por museus da Alemanha',
      'Por diversos países como China, França, Egito e Rússia',
      'Foram destruídas após a primeira exposição',
      'Apenas por galerias virtuais na internet',
    ],
    correct: 1,
    explanation: 'As "Trash People" já foram expostas em vários locais emblemáticos como a Muralha da China, Pirâmides do Egito e Praça Vermelha.',
  },
  {
    id: 'h4',
    topic: 'HA Schult',
    wave: [3],
    question: 'HA Schult é conhecido por criar arte com qual propósito principal?',
    options: [
      'Decoração de interiores',
      'Provocação e conscientização ambiental',
      'Entretenimento infantil',
      'Moda sustentável',
    ],
    correct: 1,
    explanation: 'Schult usa a arte como provocação para despertar a consciência ecológica e alertar sobre o consumismo.',
  },

  // ─── AI WEIWEI ───
  {
    id: 'a1',
    topic: 'Ai Weiwei',
    wave: [3],
    question: 'Ai Weiwei é um artista e ativista chinês conhecido por criticar:',
    options: [
      'O sistema capitalista americano',
      'O autoritarismo do governo chinês e a violação de direitos humanos',
      'A arte europeia contemporânea',
      'O mercado de arte global',
    ],
    correct: 1,
    explanation: 'Weiwei é perseguido pelo governo chinês por suas críticas ao autoritarismo, censura e violações de direitos humanos.',
  },
  {
    id: 'a2',
    topic: 'Ai Weiwei',
    wave: [3],
    question: 'Qual instalação famosa de Ai Weiwei cobre o chão do Museu com milhares de?',
    options: [
      'Velas acesas',
      'Sementes de girassol feitas de porcelana pintada à mão',
      'Moedas de ouro',
      'Fotografias de presos políticos',
    ],
    correct: 1,
    explanation: '"Sunflower Seeds" (2010) cobriu o chão do Tate Modern com 100 milhões de sementes de girassol de porcelana.',
  },
  {
    id: 'a3',
    topic: 'Ai Weiwei',
    wave: [3],
    question: 'Durante o terremoto de Sichuan (2008), Ai Weiwei:',
    options: [
      'Criou uma obra celebrando a reconstrução',
      'Denunciou a corrupção na construção de escolas que desabaram matando milhares de crianças',
      'Pintou um mural em homenagem às vítimas',
      'Fez uma exposição sobre terremotos',
    ],
    correct: 1,
    explanation: 'Weiwei investigou e expôs a corrupção na construção de escolas que desabaram, matando milhares de crianças.',
  },
  {
    id: 'a4',
    topic: 'Ai Weiwei',
    wave: [3],
    question: 'Por que Ai Weiwei já foi preso pelo governo chinês?',
    options: [
      'Por roubo de obras de arte',
      'Por evasão fiscal ligada à sua atividade política e ativismo',
      'Por plágio de artistas ocidentais',
      'Por vandalismo em monumentos históricos',
    ],
    correct: 1,
    explanation: 'Weiwei foi preso em 2011 por "evasão fiscal", amplamente considerado uma perseguição política por seu ativismo.',
  },

  // ─── ARPILLERAS CHILENAS ───
  {
    id: 'r1',
    topic: 'Arpilleras Chilenas',
    wave: [4],
    question: 'O que são as Arpilleras Chilenas?',
    options: [
      'Esculturas de barro típicas do Chile',
      'Bordados em tecido que retratam cenas de resistência e memória durante a ditadura',
      'Danças folclóricas da região dos Andes',
      'Pinturas em cerâmica pré-colombiana',
    ],
    correct: 1,
    explanation: 'Arpilleras são bordados em tela de saco (arpillera) feitos por mulheres para denunciar a ditadura e narrar histórias de resistência.',
  },
  {
    id: 'r2',
    topic: 'Arpilleras Chilenas',
    wave: [4],
    question: 'Quem eram as principais criadoras das arpilleras durante a ditadura chilena?',
    options: [
      'Artistas profissionais formados em universidades',
      'Mulheres de comunidades pobres, muitas esposas de presos e desaparecidos políticos',
      'Crianças em idade escolar',
      'Militares aposentados',
    ],
    correct: 1,
    explanation: 'Eram mulheres humildes que buscavam sustento e denúncia, muitas tendo maridos ou filhos presos ou desaparecidos pela ditadura.',
  },
  {
    id: 'r3',
    topic: 'Arpilleras Chilenas',
    wave: [4],
    question: 'Qual era a função política das arpilleras durante a ditadura de Pinochet?',
    options: [
      'Eram usadas como propaganda do governo militar',
      'Denunciavam violações de direitos humanos, prisões arbitrárias e desaparecimentos',
      'Eram presentes para autoridades internacionais',
      'Serviam como uniformes escolares',
    ],
    correct: 1,
    explanation: 'As arpilleras denunciavam a repressão, a fome e os desaparecimentos forçados que o regime de Pinochet tentava esconder.',
  },
  {
    id: 'r4',
    topic: 'Arpilleras Chilenas',
    wave: [4],
    question: 'Como as arpilleras eram comercializadas durante a ditadura?',
    options: [
      'Em lojas oficiais do governo',
      'Secretamente, com ajuda de organizações internacionais e igrejas',
      'Em feiras livres com autorização militar',
      'Em leilões de arte',
    ],
    correct: 1,
    explanation: 'Eram vendidas secretamente com apoio de ONGs e igrejas, contrabandeando as histórias de resistência para o exterior.',
  },
  {
    id: 'r5',
    topic: 'Arpilleras Chilenas',
    wave: [4],
    question: 'Qual técnica as arpilleras usavam para esconder críticas ao regime em suas obras?',
    options: [
      'Usavam códigos secretos em linguagem binária',
      'Cenas do cotidiano que, em detalhes, mostravam a repressão e a luta',
      'Escrita em latim nas bordas dos tecidos',
      'Mensagens escritas com tinta invisível',
    ],
    correct: 1,
    explanation: 'Bordavam cenas aparentemente comuns do dia a dia, mas os detalhes revelavam prisões, filas por comida e a ausência dos entes queridos.',
  },

  // ─── QUESTÕES MISTAS / BÔNUS ───
  {
    id: 'm1',
    topic: 'Geral',
    wave: [1, 2, 3, 4],
    question: 'Qual movimento artístico contemporâneo busca unir arte e ativismo ambiental?',
    options: [
      'Pop Art',
      'Eco-arte ou Arte Ambiental',
      'Expressionismo Abstrato',
      'Dadaísmo',
    ],
    correct: 1,
    explanation: 'A Eco-arte une expressão artística com consciência ecológica, como fazem Krajcberg, Eliasson e HA Schult.',
  },
  {
    id: 'm2',
    topic: 'Geral',
    wave: [1, 2, 3, 4],
    question: 'O que caracteriza a arte contemporânea em relação a movimentos anteriores?',
    options: [
      'Uso exclusivo de tintas a óleo',
      'Engajamento com questões sociais, políticas e ambientais do presente',
      'Foco apenas em paisagens e naturezas-mortas',
      'Obrigatoriedade de molduras douradas',
    ],
    correct: 1,
    explanation: 'Arte contemporânea dialoga com questões atuais — política, meio ambiente, identidade e tecnologia.',
  },
  {
    id: 'm3',
    topic: 'Geral',
    wave: [1, 2, 3, 4],
    question: 'Qual destes artistas NÃO é conhecido por temática ambiental?',
    options: [
      'Frans Krajcberg',
      'Olafur Eliasson',
      'HA Schult',
      'Pablo Picasso',
    ],
    correct: 3,
    explanation: 'Picasso é do movimento cubista (início do século XX), não da arte ambiental contemporânea.',
  },
  {
    id: 'm4',
    topic: 'Geral',
    wave: [1, 2, 3, 4],
    question: 'O que as obras de Krajcberg, Eliasson, HA Schult, Ai Weiwei e as Arpilleras têm em comum?',
    options: [
      'Todas usam tinta acrílica',
      'Todas têm um forte componente de crítica social, política ou ambiental',
      'Todas foram feitas no mesmo ano',
      'Todas são esculturas em bronze',
    ],
    correct: 1,
    explanation: 'Todos esses artistas e movimentos usam a arte como ferramenta de crítica e transformação social/ambiental.',
  },
];

export default questions;

export function getQuestionsForWave(waveNumber) {
  return questions.filter(q => q.wave.includes(waveNumber));
}

export function getRandomQuestion(waveNumber, excludeIds = []) {
  const pool = getQuestionsForWave(waveNumber).filter(q => !excludeIds.includes(q.id));
  if (pool.length === 0) return getRandomQuestion(waveNumber, []);
  return pool[Math.floor(Math.random() * pool.length)];
}
