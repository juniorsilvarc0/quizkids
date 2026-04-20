# Prompt para Claude Code — Atualização do Quiz

## Contexto

Tenho um app de quiz bíblico infantil por equipes (HTML/CSS/JS vanilla, servido com Nginx + Docker na porta 3004). O app se chama atualmente **"Quiz Igreja Viva"** e tem 20 perguntas. O sistema atual suporta apenas 2 equipes fixas (hardcoded no HTML, CSS e JS). Preciso fazer três alterações:

1. **Renomear** de "Quiz Igreja Viva" para **"Reconectando — Identidade Original"**
2. **Substituir todas as 20 perguntas** pelas 30 novas perguntas listadas abaixo
3. **Tornar o sistema de equipes dinâmico** — começar com 2 equipes padrão ("Bondade" e "Santidade") mas permitir adicionar mais equipes em tempo de execução na tela de setup

---

## Tarefa 1 — Renomear o app

Substitua TODAS as ocorrências de "Quiz Igreja Viva" (e variações) pelo novo nome **"Reconectando — Identidade Original"** nos seguintes arquivos:

### `src/index.html`
- `<title>` → `Reconectando — Identidade Original`
- O `<h1 class="titulo-principal bounce">` que hoje mostra `Quiz<br>Igreja Viva` → deve mostrar `Reconectando<br>Identidade Original`

### `src/js/questions.js`
- Comentário do topo do arquivo: trocar `Quiz Igreja Viva` por `Reconectando — Identidade Original`
- Trocar `20 perguntas bíblicas para crianças` por `30 perguntas — Série Identidade Original`

### `src/js/app.js`
- Comentário do topo: trocar `Quiz Igreja Viva` por `Reconectando — Identidade Original`

### `src/js/sounds.js`
- Comentário do topo: trocar `Quiz Igreja Viva` por `Reconectando — Identidade Original`

### `src/css/styles.css`
- Comentário do topo: trocar `Quiz Igreja Viva` por `Reconectando — Identidade Original`

### `spec.md`
- Trocar todas as referências a `Quiz Igreja Viva` por `Reconectando — Identidade Original`
- Trocar `quiz-igreja-viva/` por `reconectando-identidade-original/`

### `claude.md`
- Trocar todas as referências a `Quiz Igreja Viva` por `Reconectando — Identidade Original`
- Trocar `quiz-igreja-viva/` por `reconectando-identidade-original/`

### `prod.md`
- Trocar todas as referências a `Quiz Igreja Viva` por `Reconectando — Identidade Original`

### `README.md`
- Trocar todas as referências a `Quiz Igreja Viva` por `Reconectando — Identidade Original`

---

## Tarefa 2 — Substituir TODAS as perguntas

Reescreva **completamente** o arquivo `src/js/questions.js` com as 30 perguntas abaixo. Mantenha exatamente o mesmo formato/estrutura de dados existente: `{ id, question, options: [{ letter, text }], correct }`. Agora serão **30 perguntas** (antes eram 20).

**IMPORTANTE:** No `src/js/app.js`, a lógica já usa `questions.length` para determinar o total, então o progresso ("Pergunta X de Y") vai se ajustar automaticamente. Verifique que não existe nenhum hardcode de `20` em nenhum arquivo. Se houver qualquer referência hardcoded ao número 20 (como "20 perguntas" em comentários ou specs), atualize para 30.

Aqui estão as 30 perguntas no formato correto:

```javascript
/**
 * Reconectando — Identidade Original — Perguntas
 * 30 perguntas — Série Identidade Original
 */

const questions = [
    // TEMA 1: O Mistério da Identidade Original (01/03)
    { id: 1, question: "De acordo com a Bíblia, à imagem de quem fomos criados?", options: [{ letter: "A", text: "À imagem dos anjos" }, { letter: "B", text: "À imagem de Deus" }, { letter: "C", text: "À imagem dos nossos pais" }], correct: "B" },
    { id: 2, question: "Qual versículo diz 'Criou Deus o homem à sua imagem'?", options: [{ letter: "A", text: "Gênesis 1:27" }, { letter: "B", text: "Romanos 3:23" }, { letter: "C", text: "Salmo 23:1" }], correct: "A" },
    { id: 3, question: "A Bíblia diz que fomos feitos de modo...", options: [{ letter: "A", text: "Comum e simples" }, { letter: "B", text: "Especial e admirável" }, { letter: "C", text: "Rápido e apressado" }], correct: "B" },
    { id: 4, question: "O que significa dizer que carregamos o 'DNA do Criador'?", options: [{ letter: "A", text: "Que somos iguais a Deus em tudo" }, { letter: "B", text: "Que fomos criados para parecer com Deus e refletir Seu caráter" }, { letter: "C", text: "Que somos robôs de Deus" }], correct: "B" },
    { id: 5, question: "O que NÃO devemos confundir, segundo a lição?", options: [{ letter: "A", text: "O que você FEZ com quem você É" }, { letter: "B", text: "O seu nome com o nome dos pais" }, { letter: "C", text: "A escola com a igreja" }], correct: "A" },
    { id: 6, question: "1 Pedro 2:9 diz que somos povo...", options: [{ letter: "A", text: "Comum de Deus" }, { letter: "B", text: "Exclusivo de Deus" }, { letter: "C", text: "Esquecido por Deus" }], correct: "B" },
    { id: 7, question: "Quando Deus definiu quem você é?", options: [{ letter: "A", text: "Quando você nasceu" }, { letter: "B", text: "ANTES de você nascer" }, { letter: "C", text: "Quando você foi batizado" }], correct: "B" },
    { id: 8, question: "O que é o arrependimento, segundo a lição?", options: [{ letter: "A", text: "Ficar triste para sempre" }, { letter: "B", text: "O caminho de volta para quem Deus criou você para ser" }, { letter: "C", text: "Nunca mais errar" }], correct: "B" },
    { id: 9, question: "Segundo 1 João 1:9, o que acontece quando nos arrependemos?", options: [{ letter: "A", text: "Deus fica com raiva" }, { letter: "B", text: "Deus perdoa, restaura e lembra você de quem você é" }, { letter: "C", text: "Nada muda" }], correct: "B" },
    { id: 10, question: "O que é santidade, segundo o slide da Identidade Original?", options: [{ letter: "A", text: "Ser perfeito e nunca errar" }, { letter: "B", text: "Escolher voltar para o padrão original de Deus" }, { letter: "C", text: "Ficar quieto o dia inteiro" }], correct: "B" },

    // TEMA 2: Todos Pecaram (08/03)
    { id: 11, question: "O que é pecado, de acordo com 1 João 3:4?", options: [{ letter: "A", text: "É ser uma pessoa má para sempre" }, { letter: "B", text: "É a transgressão da lei — ultrapassar o limite que Deus colocou" }, { letter: "C", text: "É fazer algo sem querer" }], correct: "B" },
    { id: 12, question: "Romanos 3:23 diz que...", options: [{ letter: "A", text: "Só as crianças pecaram" }, { letter: "B", text: "Só os adultos pecaram" }, { letter: "C", text: "TODOS pecaram" }], correct: "C" },
    { id: 13, question: "De acordo com Eclesiastes 7:20, existe alguém justo que nunca peque?", options: [{ letter: "A", text: "Sim, existem muitas pessoas" }, { letter: "B", text: "Não, ninguém é justo assim" }, { letter: "C", text: "Apenas os pastores" }], correct: "B" },
    { id: 14, question: "Segundo Isaías 59:2, o que as nossas iniquidades fazem?", options: [{ letter: "A", text: "Nos aproximam de Deus" }, { letter: "B", text: "Fazem separação entre nós e Deus" }, { letter: "C", text: "Nos tornam mais fortes" }], correct: "B" },
    { id: 15, question: "Romanos 6:23 diz que o salário do pecado é a morte, mas o dom gratuito de Deus é...", options: [{ letter: "A", text: "A riqueza material" }, { letter: "B", text: "A vida eterna em Cristo Jesus" }, { letter: "C", text: "Um anjo da guarda" }], correct: "B" },
    { id: 16, question: "Romanos 5:8 ensina que Deus provou Seu amor de que forma?", options: [{ letter: "A", text: "Dando-nos presentes" }, { letter: "B", text: "Cristo morreu por nós quando ainda éramos pecadores" }, { letter: "C", text: "Criando o arco-íris" }], correct: "B" },
    { id: 17, question: "Qual é o caminho de volta depois de pecar? (4 passos na ordem certa)", options: [{ letter: "A", text: "Chorar, fugir, esquecer, fingir" }, { letter: "B", text: "Reconhecer, confessar, receber perdão, voltar para a identidade original" }, { letter: "C", text: "Esconder, mentir, culpar outro, esquecer" }], correct: "B" },
    { id: 18, question: "O versículo de Provérbios 3:9 fala sobre ofertas. O que ele diz?", options: [{ letter: "A", text: "Guarde tudo para você" }, { letter: "B", text: "Honra ao Senhor com os teus bens" }, { letter: "C", text: "Só oferte quando sobrar" }], correct: "B" },

    // TEMA 3: Jesus Restaurou Minha Identidade (15/03)
    { id: 19, question: "Na história da mulher adúltera (João 8:10-11), o que Jesus disse a ela?", options: [{ letter: "A", text: "Você é culpada e merece castigo" }, { letter: "B", text: "Nem eu te condeno; vai e não peques mais" }, { letter: "C", text: "Fuja daqui antes que voltem" }], correct: "B" },
    { id: 20, question: "O que Jesus fez pela identidade da mulher adúltera?", options: [{ letter: "A", text: "Confirmou que ela era culpada para sempre" }, { letter: "B", text: "Deu a ela uma nova identidade: de culpada para libertada por Jesus" }, { letter: "C", text: "Mandou ela embora sem falar nada" }], correct: "B" },
    { id: 21, question: "O que diz 2 Coríntios 5:17?", options: [{ letter: "A", text: "Se alguém está em Cristo, é nova criação; as coisas antigas passaram" }, { letter: "B", text: "Quem peca nunca mais pode voltar" }, { letter: "C", text: "Só os adultos podem ser novas criaturas" }], correct: "A" },
    { id: 22, question: "O que significa 'restaurar', segundo a lição?", options: [{ letter: "A", text: "Virar uma pessoa completamente diferente" }, { letter: "B", text: "Trazer de volta ao original, como Deus planejou desde o começo" }, { letter: "C", text: "Esquecer quem você era antes" }], correct: "B" },
    { id: 23, question: "A lição comparou nossa identidade com qual documento?", options: [{ letter: "A", text: "Passaporte" }, { letter: "B", text: "Carteira de identidade (RG)" }, { letter: "C", text: "Boletim escolar" }], correct: "B" },
    { id: 24, question: "O que as crianças repetiram 3 vezes na lição sobre restauração?", options: [{ letter: "A", text: "Eu sou perfeito!" }, { letter: "B", text: "Jesus, me faz novo outra vez!" }, { letter: "C", text: "Nunca mais vou errar!" }], correct: "B" },

    // TEMA 4: Santidade é Liberdade (22/03)
    { id: 25, question: "De acordo com a lição, santificação é...", options: [{ letter: "A", text: "Viver preso a muitas regras chatas" }, { letter: "B", text: "Viver do jeitinho que Jesus gosta todos os dias — é proteção, não prisão" }, { letter: "C", text: "Nunca se divertir" }], correct: "B" },
    { id: 26, question: "João 8:36 diz: 'Se o Filho vos libertar...'", options: [{ letter: "A", text: "...tereis que pagar um preço" }, { letter: "B", text: "...verdadeiramente sereis livres" }, { letter: "C", text: "...ficareis presos" }], correct: "B" },
    { id: 27, question: "Na dinâmica 'Preso ou Livre?', o barbante nas mãos representava o quê?", options: [{ letter: "A", text: "Um presente de Deus" }, { letter: "B", text: "O pecado que nos prende e impede de viver livres" }, { letter: "C", text: "A corda de um brinquedo" }], correct: "B" },
    { id: 28, question: "Na prática, a santificação acontece nas coisas pequenas como:", options: [{ letter: "A", text: "Obedecer aos pais, dividir o brinquedo e falar a verdade" }, { letter: "B", text: "Fazer coisas difíceis e impossíveis" }, { letter: "C", text: "Ficar o dia todo orando sem parar" }], correct: "A" },
    { id: 29, question: "Quando fazemos coisas erradas (mentir, desobedecer, brigar), nosso coração fica...", options: [{ letter: "A", text: "Leve e feliz" }, { letter: "B", text: "Triste e apertado" }, { letter: "C", text: "Igual, não muda nada" }], correct: "B" },
    { id: 30, question: "Qual é o versículo de 1 Pedro 1:16 que encerrou a série?", options: [{ letter: "A", text: "Amem uns aos outros" }, { letter: "B", text: "Sede santos, porque Eu sou santo" }, { letter: "C", text: "Não tenham medo" }], correct: "B" }
];
```

---

## Tarefa 3 — Sistema de equipes dinâmico (N equipes)

O app atual tem exatamente 2 equipes hardcoded em todo o código (HTML, CSS, JS). Preciso transformar isso num sistema dinâmico que:

- Comece com **2 equipes padrão** já criadas: **"Bondade"** (emoji ❤️) e **"Santidade"** (emoji ⭐)
- Permita **adicionar mais equipes** na tela de setup (em tempo de execução), até um máximo de **6 equipes**
- Permita **remover** equipes adicionadas (as 2 padrão também podem ser removidas, desde que restem no mínimo 2)
- O **mínimo** de equipes para jogar é **2**

### 3.1 — Paleta de cores para até 6 equipes

Defina no CSS (`:root`) variáveis para 6 equipes com cores distintas e vibrantes. As equipes dinâmicas vão usar essas cores com base na sua posição (1ª equipe criada usa cor 1, 2ª usa cor 2, etc.):

```
Equipe 1: Vermelho   — #E74C3C (light: #FDEDEC, glow: rgba(231,76,60,0.4))
Equipe 2: Azul       — #3B82F6 (light: #EBF5FB, glow: rgba(59,130,246,0.4))
Equipe 3: Verde      — #27AE60 (light: #EAFAF1, glow: rgba(39,174,96,0.4))
Equipe 4: Roxo       — #8E44AD (light: #F4ECF7, glow: rgba(142,68,173,0.4))
Equipe 5: Laranja    — #F39C12 (light: #FEF5E7, glow: rgba(243,156,18,0.4))
Equipe 6: Rosa       — #E91E63 (light: #FCE4EC, glow: rgba(233,30,99,0.4))
```

Paleta de emojis padrão para novos times (usados quando o usuário adiciona um time, na ordem): `❤️, ⭐, 🔥, 💎, 🌟, 🎯`

### 3.2 — Tela de Setup (`#tela-setup`) — redesign

Trocar o layout atual (2 cards fixos lado a lado com "VS" no meio) por um layout dinâmico:

**Estrutura:**
- Título: `"Nossas Equipes!"` (manter)
- Container de equipes (`#setup-equipes-container`): renderizado via JS, não hardcoded no HTML
- Botão `"+ Adicionar Equipe"` (`#btn-adicionar-equipe`): abaixo da lista de equipes. Visível apenas se houver menos de 6 equipes. Estilo: botão com borda tracejada, cor neutra, ícone "+"
- Botão `"Iniciar Quiz"` (manter)

**Cada card de equipe no setup deve ter:**
- Emoji do time (editável via clique — abre um mini picker com os emojis: ❤️ ⭐ 🔥 💎 🌟 🎯 👑 🦁 🐉 🦅 🎵 ⚡)
- Input de texto para nome do time (editável, maxlength 24)
- Botão "✕" para remover o time (só aparece se houver mais de 2 equipes)
- Cor do card baseada na posição do time na paleta definida acima

**Layout dos cards de equipe:**
- Usar flexbox com `flex-wrap: wrap` e `justify-content: center`
- Cada card deve ter largura fixa de ~250px
- Entre os cards, exibir "VS" como separador (estilizado como o atual `.setup-vs`)
- O "VS" aparece entre cada par de equipes (não antes da primeira nem depois da última)
- No mobile, os cards ficam empilhados verticalmente

**Estado padrão ao abrir o app:**
- Equipe 1: nome `"Bondade"`, emoji `❤️`, cor vermelha (slot 1)
- Equipe 2: nome `"Santidade"`, emoji `⭐`, cor azul (slot 2)

**Ao clicar "+ Adicionar Equipe":**
- Cria um novo card com nome padrão `"Equipe N"` (onde N é o número total de equipes), emoji e cor do próximo slot disponível na paleta
- Animação de entrada suave (fade-in + slide-down)
- Se atingir 6 equipes, o botão "+" desaparece

**Ao clicar "✕" para remover:**
- Remove o card com animação (fade-out)
- Reorganiza as cores dos times restantes (cada time mantém sua cor original, não re-atribui)
- Se restar apenas 2 equipes, esconde todos os botões "✕"

### 3.3 — Estado do jogo (`app.js`) — refatoração para N equipes

O estado atual é:

```javascript
this.state = {
    teams: {
        1: { name: 'Coração Vivo', score: 0, color: '#E74C3C', emoji: '❤️' },
        2: { name: 'Amor em Ação', score: 0, color: '#3B82F6', emoji: '🤝' }
    }
};
```

**Refatorar para:**

```javascript
this.state = {
    teams: [] // Array dinâmico de objetos { id, name, score, color, colorLight, colorGlow, emoji }
};
```

Usar **array** em vez de objeto com chaves 1/2. Cada equipe recebe um `id` único (pode ser incremental). Toda a lógica que hoje faz `this.state.teams[1]` e `this.state.teams[2]` precisa ser refatorada para funcionar com `this.state.teams[index]` ou buscando por `id`, onde o número de equipes é dinâmico.

### 3.4 — Placar no topo (`#placar-topo`) — renderização dinâmica

O placar hoje é hardcoded com 2 equipes. Refatorar para renderizar via JS:

**Layout:**
- Usar flexbox horizontal com `flex-wrap: wrap` e `justify-content: center`
- Cada equipe tem um card de placar com: emoji, nome, pontuação
- A barra de progresso ("Pergunta X de Y") fica centralizada (pode ir para uma linha separada se houver muitas equipes)
- A coroa 👑 aparece na(s) equipe(s) que está(ão) na frente (pode haver empate parcial com múltiplas coroas)
- O placar deve ser gerado via JS no `_startQuiz()` e atualizado no `_updateScoreboard()`

**Responsividade do placar:**
- Com 2-3 equipes: tudo cabe numa linha
- Com 4-6 equipes: os cards de placar ficam menores (fonte menor, padding menor) e usam wrap se necessário
- No mobile: sempre wrap, cards empilham em 2 colunas

### 3.5 — Painéis "Quem responde?" — renderização dinâmica

Hoje são 2 botões hardcoded. Refatorar:

**Renderizar via JS** os painéis de todas as equipes participantes. Cada painel é um botão com emoji + nome, usando a cor do time. Quando uma equipe é selecionada, as outras ficam opacas (classe `.opaco`).

**Layout:**
- Flexbox horizontal com wrap
- Gap de 16px entre painéis
- Label "Quem responde?" centralizada acima dos painéis
- Cada painel segue o estilo visual atual (`.painel-equipe`) mas com cores dinâmicas via inline style ou CSS custom properties

### 3.6 — Lógica de segunda chance — adaptar para N equipes

A lógica atual é: equipe A erra → equipe B tem segunda chance. Com N equipes, a regra deve ser:

**Quando uma equipe erra:**
1. A equipe que errou fica desativada (`.opaco`, não pode mais responder nesta pergunta)
2. A alternativa errada fica riscada (`.riscada`)
3. Mostra novamente os painéis das equipes **que ainda não tentaram** nesta pergunta
4. Mensagem: `"Errou! Quem tenta agora?"` (não mais "Vez de [nome]" porque pode haver múltiplas equipes restantes)
5. A próxima equipe escolhe e responde
6. Se errar de novo, repete o processo com as equipes restantes
7. Se TODAS as equipes errarem, mostra a resposta correta + "Ninguém pontuou!" + botão "Próxima →"
8. Se uma equipe acertar, ela pontua normalmente

**Estado necessário para controlar isso:**
```javascript
this.state.teamsTriedThisQuestion = [] // IDs das equipes que já tentaram nesta pergunta
```

### 3.7 — Tela final — placar para N equipes

Refatorar a tela de resultados:

- Renderizar o placar final de **todas as equipes**, ordenado por pontuação (maior primeiro)
- A(s) equipe(s) vencedora(s) recebem destaque visual (classe `.vencedor`, borda amarela, glow)
- Empate entre múltiplas equipes: todas as empatadas em 1º lugar recebem destaque
- Layout: cards de placar empilhados ou em grid, cada um com emoji, nome, pontuação
- Confetes usam as cores do(s) vencedor(es)
- Mensagem de destaque:
  - 1 vencedor: `"🏆 [Nome] venceu! 🏆"`
  - Empate entre todos: `"Empate geral! 🤝"`
  - Empate parcial: `"🏆 Empate entre [Nome1] e [Nome2]! 🏆"`

### 3.8 — Atalhos de teclado — adaptar

A lógica atual usa teclas 1/Q e 2/W para selecionar equipe 1 e 2. Com N equipes:

- Teclas `1` a `6` selecionam a equipe na posição correspondente (se a equipe existir e ainda não tiver jogado naquela rodada)
- Remover os atalhos Q/W (não fazem mais sentido com N equipes)
- Manter teclas `A/B/C` (ou `7/8/9`) para alternativas
- Manter `Enter`/`→` para próxima pergunta
- Manter `F` para fullscreen

### 3.9 — CSS — estilos dinâmicos

Como as cores das equipes são dinâmicas, ao invés de ter classes hardcoded `.painel-equipe-1`, `.painel-equipe-2`, etc., usar **CSS custom properties inline** por equipe. Manter o estilo visual geral (gradientes, sombras, border-radius, animações).

Para os estilos que dependem de cor do time (fundo do painel, sombra, glow, fundo do placar), definir CSS custom properties no elemento:

```javascript
// No JS, ao renderizar cada elemento de equipe:
element.style.setProperty('--team-color', team.color);
element.style.setProperty('--team-light', team.colorLight);
element.style.setProperty('--team-glow', team.colorGlow);
```

E no CSS, usar essas variáveis:
```css
.placar-equipe {
    background: var(--team-light);
    border-color: var(--team-color);
}
.placar-equipe.na-frente {
    box-shadow: 0 0 20px var(--team-glow);
}
.painel-equipe {
    border-color: var(--team-color);
}
/* etc. */
```

Remover as classes hardcoded `.placar-equipe-1`, `.placar-equipe-2`, `.painel-equipe-1`, `.painel-equipe-2`, `.equipe-1-bg`, `.equipe-2-bg` e substituir por este sistema de custom properties.

### 3.10 — HTML simplificado

O `index.html` deve ter containers vazios onde o JS vai renderizar o conteúdo dinâmico. Remover todo HTML hardcoded de equipes:

- **Setup:** manter apenas o `<div id="setup-equipes-container"></div>`, o botão `"+ Adicionar Equipe"` e o botão `"Iniciar Quiz"`
- **Placar topo:** manter apenas o `<div id="placar-topo"></div>` como container (conteúdo renderizado via JS)
- **Painéis de equipe:** manter apenas o `<div id="paineis-equipe"></div>` (conteúdo renderizado via JS)
- **Tela final:** manter apenas os containers `#resultado-destaque` e `#placar-final` (conteúdo renderizado via JS)

---

## Regras gerais

- **Stack:** HTML/CSS/JS vanilla puro. ZERO frameworks, ZERO CDNs, ZERO dependências externas
- **Sons:** manter Web Audio API sintetizada (não alterar `sounds.js` além do comentário do topo)
- **Confetes:** manter `confetti.js` como está (os métodos `burst(color)` e `rain(colorsArray)` já aceitam cores dinâmicas)
- **Docker:** manter exatamente como está (porta 3004)
- **Responsividade:** manter os breakpoints existentes (768px e 1024px), adaptar para que N equipes fiquem bonitas em todas as telas
- **Animações:** manter todas as animações existentes (bounce, pulse, fade-in, shake, pop, confetes)
- **Mínimo de equipes:** 2 (não permitir iniciar com menos de 2)
- **Máximo de equipes:** 6

---

## Checklist de Verificação

Após fazer todas as alterações, verifique:

1. **Grep por "Igreja Viva"** em todos os arquivos — não deve existir nenhuma ocorrência restante
2. **Grep por "Coração Vivo"** e **"Amor em Ação"** — não devem existir (agora os padrões são "Bondade" e "Santidade")
3. **Grep por "20 perguntas"** — não deve existir (agora são 30)
4. O arquivo `questions.js` deve ter exatamente **30 objetos** no array
5. Cada pergunta deve ter `id` sequencial de 1 a 30
6. Cada pergunta deve ter exatamente 3 opções (A, B, C) e um `correct` válido
7. O `<title>` do HTML deve ser `Reconectando — Identidade Original`
8. O título na tela inicial deve exibir `Reconectando` na primeira linha e `Identidade Original` na segunda
9. Confirme que não há nenhum número `20` hardcoded em nenhum arquivo
10. **Tela de setup:** abre com 2 equipes ("Bondade" ❤️ e "Santidade" ⭐), botão "+" visível
11. **Adicionar equipe:** clicar "+" cria 3ª equipe com nome "Equipe 3", cor verde, emoji 🔥
12. **Remover equipe:** "✕" só aparece se houver mais de 2 equipes
13. **Máximo 6 equipes:** botão "+" desaparece ao atingir 6
14. **Emoji picker:** clicar no emoji de qualquer equipe abre um mini seletor com 12 opções
15. **Placar topo:** renderiza dinamicamente para N equipes, coroa no(s) líder(es)
16. **Painéis "Quem responde?":** renderiza N painéis, equipes que já erraram ficam desativadas
17. **Segunda chance com N equipes:** cada equipe tem 1 tentativa por pergunta, alternativas erradas ficam riscadas, quando todas erram mostra a correta
18. **Tela final:** placar ordenado por pontuação, vencedor(es) com destaque
19. **Teclado:** teclas 1-6 selecionam equipes, A/B/C selecionam alternativas
20. **Responsivo:** funciona bem com 2 a 6 equipes em desktop, tablet e mobile
21. O app continua rodando normalmente com `docker compose up --build -d` na porta 3004
22. **Zero erros** no console do browser

---

## Resumo

- **Tarefa 1:** Renomear "Quiz Igreja Viva" → "Reconectando — Identidade Original" (em TODOS os arquivos)
- **Tarefa 2:** Substituir as 20 perguntas antigas pelas 30 novas (copiar o bloco `questions.js` acima na íntegra)
- **Tarefa 3:** Refatorar o sistema de equipes de 2 fixas para N dinâmicas (2 a 6), com equipes padrão "Bondade" e "Santidade", botão para adicionar/remover equipes no setup, emoji picker, placar/painéis/segunda chance/tela final tudo dinâmico, CSS com custom properties por equipe