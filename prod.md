# PROD.md — Reconectando — Identidade Original

## Visão Geral do Produto

Aplicação web interativa para apresentar um quiz bíblico infantil chamado **"Reconectando — Identidade Original"** em formato de tela cheia. Projetado para ser usado em cultos infantis, células kids ou eventos da igreja, onde um líder projeta o quiz em um telão e as crianças participam respondendo em voz alta ou levantando a mão.

## Público-Alvo

- **Usuário primário:** Líder/professor de crianças que opera o quiz no computador/projetor
- **Público:** Crianças de 5 a 12 anos participando presencialmente

## Objetivos

1. Tornar o momento de revisão do conteúdo bíblico divertido e envolvente
2. Interface fullscreen bonita, colorida e com animações para prender a atenção das crianças
3. Feedback visual e sonoro para acertos e erros
4. Operação simples — o líder avança as perguntas com clique ou teclado

## Funcionalidades (MVP)

### Tela Inicial
- Logo/título "Reconectando — Identidade Original" com animação de entrada
- Botão "Começar" grande e chamativo
- Música/som de fundo opcional

### Fluxo do Quiz
- Exibe uma pergunta por vez em tela cheia
- 3 alternativas (A, B, C) com botões grandes e coloridos
- Ao clicar numa alternativa:
  - **Acerto:** animação de celebração (confetes, estrelas) + som de acerto + destaque verde
  - **Erro:** animação suave de erro + som de erro + destaque vermelho + mostra a resposta correta
- Indicador de progresso (pergunta X de 30)
- Botão "Próxima" aparece após responder

### Tela Final
- Placar final (acertos / total)
- Mensagem de parabéns com animação festiva
- Botão "Jogar Novamente"

## Requisitos Não-Funcionais

- **Responsivo:** funciona em projetor (16:9), notebook e tablet
- **Performance:** leve, carrega rápido
- **Docker:** roda com `docker compose up` na porta 3004
- **Sem banco de dados:** quiz hardcoded no frontend
- **Sem autenticação:** acesso direto

## Stack Técnica

- **Frontend:** HTML + CSS + JavaScript vanilla (single page)
- **Server:** Nginx servindo arquivos estáticos
- **Container:** Docker + Docker Compose
- **Porta:** localhost:3004

## Fora de Escopo (MVP)

- Login / autenticação
- Banco de dados
- Placar persistente entre sessões
- Multiplayer / resposta individual por dispositivo
- Painel admin para editar perguntas
