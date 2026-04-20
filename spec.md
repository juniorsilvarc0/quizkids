# SPEC.md — Especificação Técnica

## Arquitetura

```
reconectando-identidade-original/
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
└── src/
    ├── index.html          # Página principal (SPA)
    ├── css/
    │   └── styles.css      # Estilos, animações, responsividade
    ├── js/
    │   ├── app.js          # Lógica principal do quiz
    │   ├── questions.js    # Dados das 30 perguntas
    │   ├── sounds.js       # Gerenciamento de áudio
    │   └── confetti.js     # Animação de confetes
    ├── sounds/
    │   ├── correct.mp3     # Som de acerto
    │   ├── wrong.mp3       # Som de erro
    │   ├── click.mp3       # Som de clique
    │   └── celebration.mp3 # Som de celebração final
    └── img/
        └── (ícones/imagens opcionais)
```

## Docker

### Dockerfile
- Base: `nginx:alpine`
- Copia `src/` para `/usr/share/nginx/html/`
- Copia `nginx.conf` customizado

### docker-compose.yml
```yaml
version: "3.8"
services:
  quiz:
    build: .
    ports:
      - "3004:80"
    restart: unless-stopped
```

### nginx.conf
- Serve arquivos estáticos de `/usr/share/nginx/html`
- Gzip habilitado
- Cache headers para assets

## Estrutura de Dados (questions.js)

```javascript
const questions = [
  {
    id: 1,
    question: "De acordo com a Bíblia, à imagem de quem fomos criados?",
    options: [
      { letter: "A", text: "À imagem dos anjos" },
      { letter: "B", text: "À imagem de Deus" },
      { letter: "C", text: "À imagem dos nossos pais" }
    ],
    correct: "B"
  },
  // ... 30 perguntas
];
```

## Telas e Estados

### 1. Tela Inicial (`state: "start"`)
- Título animado "Reconectando — Identidade Original" com efeito de escala/bounce
- Subtítulo com versículo ou frase motivacional
- Botão "Começar" pulsante
- Background com gradiente colorido e partículas animadas

### 2. Tela de Pergunta (`state: "question"`)
- Número da pergunta + barra de progresso no topo
- Texto da pergunta centralizado (fonte grande, legível à distância)
- 3 cards de alternativa empilhados verticalmente
- Cada card com letra (A/B/C) + texto
- Animação de entrada (slide-in das alternativas)

### 3. Tela de Resposta (`state: "answered"`)
- Alternativa selecionada destacada:
  - ✅ Verde + ícone check + som de acerto + confetes se correto
  - ❌ Vermelho + ícone X + som de erro se incorreto
  - Resposta correta sempre fica verde
- Botão "Próxima →" aparece com delay de 1.5s

### 4. Tela Final (`state: "finished"`)
- Placar grande: "Você acertou X de 30!"
- Estrelas / troféu animado
- Confetes caindo
- Som de celebração
- Mensagem condicional:
  - 30/30: "PERFEITO! 🌟"
  - 20-29: "INCRÍVEL! 🎉"
  - 10-19: "MUITO BEM! 👏"
  - 0-9: "CONTINUE APRENDENDO! 💪"
- Botão "Jogar Novamente"

## Animações (CSS + JS)

| Animação | Onde | Técnica |
|----------|------|---------|
| Bounce do título | Tela inicial | CSS `@keyframes` |
| Pulse do botão | Botão "Começar" | CSS `animation` |
| Slide-in | Alternativas | CSS `transform` + `transition` |
| Shake | Resposta errada | CSS `@keyframes` |
| Scale-up | Resposta certa | CSS `transform: scale()` |
| Confetes | Acerto + Tela final | Canvas JS |
| Fade transition | Entre perguntas | CSS `opacity` + `transition` |
| Barra de progresso | Topo | CSS `width` transition |
| Partículas bg | Tela inicial | CSS animated circles |

## Sons

Sons gerados via Web Audio API (sintetizados) para não depender de arquivos externos:
- **Acerto:** tom ascendente alegre (C-E-G)
- **Erro:** tom descendente curto (buzzer suave)
- **Clique:** click suave
- **Celebração:** sequência de tons alegres

## Controles

| Ação | Mouse/Touch | Teclado |
|------|------------|---------|
| Selecionar equipe | Clique no painel | Tecla `1`-`6` |
| Selecionar A | Clique no card A | Tecla `A` |
| Selecionar B | Clique no card B | Tecla `B` |
| Selecionar C | Clique no card C | Tecla `C` |
| Próxima pergunta | Clique "Próxima" | `Enter` ou `→` |
| Começar | Clique "Começar" | `Enter` |
| Tela cheia | Clique ícone | `F11` ou `F` |

## Design Visual

- **Paleta de cores:** Vibrante e infantil
  - Primary: `#FF6B6B` (coral)
  - Secondary: `#4ECDC4` (turquesa)
  - Accent: `#FFE66D` (amarelo)
  - Success: `#51CF66` (verde)
  - Error: `#FF6B6B` (vermelho)
  - Background: gradiente roxo/azul (`#667eea` → `#764ba2`)
- **Tipografia:** System fonts arredondadas, tamanho grande (mín 24px para corpo)
- **Border-radius:** Generoso (16px+) para visual amigável
- **Sombras:** Suaves para dar profundidade aos cards

## Responsividade

- **Desktop/Projetor (>1024px):** Layout centralizado, fonte extra-grande
- **Tablet (768-1024px):** Ajuste de padding e fontes
- **Mobile (<768px):** Stack vertical, touch-friendly

## Performance

- Zero dependências externas (sem frameworks, sem CDN)
- Tudo inline ou local
- Tamanho total estimado: < 50KB
- First paint: < 500ms
