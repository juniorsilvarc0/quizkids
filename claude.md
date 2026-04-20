# CLAUDE.md — Instruções de Implementação

## Contexto

Você está implementando um quiz interativo infantil chamado **"Reconectando — Identidade Original"** para ser projetado em tela cheia durante atividades com crianças na igreja. Leia `prod.md` para entender o produto e `spec.md` para a especificação técnica completa.

## Stack

- HTML/CSS/JS vanilla (ZERO frameworks, ZERO CDNs, ZERO dependências externas)
- Nginx Alpine servindo arquivos estáticos
- Docker Compose na porta 3004

## Estrutura de Arquivos

```
reconectando-identidade-original/
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
└── src/
    ├── index.html
    ├── css/styles.css
    ├── js/app.js
    ├── js/questions.js
    ├── js/sounds.js
    └── js/confetti.js
```

## Regras de Implementação

### Gerais
- Tudo em português brasileiro
- Código limpo e comentado em português
- Sem dependências externas — tudo local e self-contained
- Sons gerados via Web Audio API (não usar arquivos .mp3)
- Animações via CSS `@keyframes` e `transitions` (performáticas, usar `transform` e `opacity`)

### HTML (index.html)
- Uma única página com todas as telas como `<section>` com `display: none/flex`
- Seções: `#tela-inicio`, `#tela-pergunta`, `#tela-final`
- Meta viewport configurado para responsividade
- Carregar CSS no head, JS antes do `</body>`

### CSS (styles.css)
- Design colorido, vibrante, infantil
- Background com gradiente animado
- Cards de alternativa com hover/active states pronunciados
- Animações definidas:
  - `.fade-in` — entrada suave
  - `.slide-up` — alternativas entram de baixo
  - `.bounce` — título pulsando
  - `.pulse` — botão começar
  - `.shake` — resposta errada
  - `.pop` — resposta certa (scale up)
  - `.confetti-piece` — partículas de confete
- Breakpoints: 768px e 1024px
- Fonte mínima de pergunta: 28px desktop, 20px mobile
- Border-radius generoso (16px nos cards)
- Botões grandes (mín 60px altura) e touch-friendly

### JavaScript

#### questions.js
- Array `const questions = [...]` com as 30 perguntas do quiz
- Cada objeto: `{ id, question, options: [{letter, text}], correct }`
- Exportar como variável global

#### sounds.js
- Classe `SoundManager` usando Web Audio API
- Métodos: `playCorrect()`, `playWrong()`, `playClick()`, `playCelebration()`
- Sons sintetizados (não depender de arquivos):
  - Acerto: acorde maior ascendente (C4-E4-G4), duração 0.4s
  - Erro: tom descendente com leve distorção, duração 0.3s
  - Clique: blip curto, duração 0.1s
  - Celebração: arpejo alegre (C4-E4-G4-C5), duração 1s
- Inicializar AudioContext no primeiro clique do usuário (política de autoplay dos browsers)

#### confetti.js
- Classe `ConfettiManager` usando Canvas API
- Canvas overlay fullscreen, pointer-events: none
- Partículas coloridas caindo com gravidade e rotação
- Métodos: `burst()` (explosão curta para acerto), `rain()` (chuva contínua para tela final), `stop()`
- Cores das partículas: coral, turquesa, amarelo, verde, roxo

#### app.js
- Classe principal `QuizApp`
- Sistema de equipes dinâmico (2 a 6 equipes)
- Estado: `{ currentQuestion: 0, teams: [...], state: "start"|"setup"|"question"|"finished" }`
- Fluxo:
  1. `init()` — setup event listeners (mouse + teclado)
  2. `start()` — transição para primeira pergunta
  3. `showQuestion(index)` — renderiza pergunta com animação
  4. `selectAnswer(letter)` — verifica, toca som, anima, atualiza placar
  5. `nextQuestion()` — avança ou vai para tela final
  6. `showResults()` — placar + celebração
  7. `restart()` — volta ao início
- Atalhos de teclado: 1-6 para selecionar equipe, A/B/C para alternativas, Enter/→ para próxima, F para fullscreen
- Botão de fullscreen no canto da tela (usar `document.documentElement.requestFullscreen()`)
- Bloquear duplo-clique (desabilitar alternativas após responder)

### Docker

#### Dockerfile
```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY src/ /usr/share/nginx/html/
EXPOSE 80
```

#### docker-compose.yml
```yaml
version: "3.8"
services:
  quiz:
    build: .
    ports:
      - "3004:80"
    restart: unless-stopped
```

#### nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript text/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Critérios de Qualidade

1. Abrir `http://localhost:3004` mostra a tela inicial com animação
2. Clicar "Começar" inicia o quiz com transição suave
3. As 3 alternativas aparecem com animação slide-up
4. Clicar numa alternativa: feedback visual + sonoro imediato
5. Acerto: confetes + verde + som alegre
6. Erro: shake + vermelho + mostra correta + som de erro
7. Barra de progresso atualiza a cada pergunta
8. Tela final mostra placar com celebração
9. "Jogar Novamente" reinicia tudo
10. Funciona em fullscreen (tecla F ou botão)
11. Teclado funciona (1-6 para equipes, A/B/C + Enter)
12. Responsivo em tela de projetor, notebook e tablet
13. Zero erros no console do browser

## Como Rodar

```bash
cd reconectando-identidade-original
docker compose up --build -d
# Abrir http://localhost:3004
```

## Dados do Quiz

As 30 perguntas estão documentadas em `prod.md`. Copie-as fielmente para `questions.js`.
