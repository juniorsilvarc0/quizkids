/**
 * Quiz Igreja Viva — Lógica Principal
 * Jogo de quiz bíblico por equipes
 */

class QuizApp {
    constructor() {
        /** Estado do jogo */
        this.state = {
            screen: 'start',        // start | setup | question | finished
            questionState: 'waiting', // waiting | team_selected | answered_correct | answered_wrong_first | answered_wrong_both | answered_correct_second
            currentQuestion: 0,
            currentTeam: null,       // 1 ou 2 — equipe respondendo agora
            firstTeamTried: null,    // equipe que tentou primeiro
            disabledOptions: [],     // letras já eliminadas
            teams: {
                1: { name: 'Coração Vivo', score: 0, color: '#E74C3C', emoji: '❤️' },
                2: { name: 'Amor em Ação', score: 0, color: '#3B82F6', emoji: '🤝' }
            }
        };

        this.sound = new SoundManager();
        this.confetti = new ConfettiManager('confetti-canvas');
        this.bloqueado = false; // evita duplo-clique

        this._cacheDOM();
        this._bindEvents();
    }

    /** Referências aos elementos do DOM */
    _cacheDOM() {
        // Telas
        this.telaInicio = document.getElementById('tela-inicio');
        this.telaSetup = document.getElementById('tela-setup');
        this.telaPergunta = document.getElementById('tela-pergunta');
        this.telaFinal = document.getElementById('tela-final');

        // Setup
        this.inputEquipe1 = document.getElementById('nome-equipe-1');
        this.inputEquipe2 = document.getElementById('nome-equipe-2');
        this.btnIniciar = document.getElementById('btn-iniciar');

        // Placar
        this.placarNome1 = document.getElementById('placar-nome-1');
        this.placarNome2 = document.getElementById('placar-nome-2');
        this.placarPontos1 = document.getElementById('placar-pontos-1');
        this.placarPontos2 = document.getElementById('placar-pontos-2');
        this.placarProgresso = document.getElementById('placar-progresso');
        this.barraFill = document.getElementById('barra-fill');
        this.coroa1 = document.getElementById('coroa-1');
        this.coroa2 = document.getElementById('coroa-2');

        // Pergunta
        this.perguntaTexto = document.getElementById('pergunta-texto');
        this.statusMsg = document.getElementById('status-msg');
        this.paineisEquipe = document.getElementById('paineis-equipe');
        this.painelEquipe1 = document.getElementById('painel-equipe-1');
        this.painelEquipe2 = document.getElementById('painel-equipe-2');
        this.painelNome1 = document.getElementById('painel-nome-1');
        this.painelNome2 = document.getElementById('painel-nome-2');
        this.alternativasDiv = document.getElementById('alternativas');
        this.btnProxima = document.getElementById('btn-proxima');

        // Final
        this.resultadoDestaque = document.getElementById('resultado-destaque');
        this.placarFinal = document.getElementById('placar-final');

        // Botões gerais
        this.btnComecar = document.getElementById('btn-comecar');
        this.btnReiniciar = document.getElementById('btn-reiniciar');
        this.btnFullscreen = document.getElementById('btn-fullscreen');
    }

    /** Bindagem de eventos */
    _bindEvents() {
        // Botões de navegação
        this.btnComecar.addEventListener('click', () => {
            this.sound.init();
            this.sound.playClick();
            this._showScreen('setup');
        });

        this.btnIniciar.addEventListener('click', () => {
            this.sound.playClick();
            this._startQuiz();
        });

        this.btnProxima.addEventListener('click', () => {
            this.sound.playClick();
            this._nextQuestion();
        });

        this.btnReiniciar.addEventListener('click', () => {
            this.sound.playClick();
            this._restart();
        });

        // Painéis de equipe
        this.painelEquipe1.addEventListener('click', () => this._selectTeam(1));
        this.painelEquipe2.addEventListener('click', () => this._selectTeam(2));

        // Fullscreen
        this.btnFullscreen.addEventListener('click', () => this._toggleFullscreen());

        // Teclado
        document.addEventListener('keydown', (e) => this._handleKeyboard(e));
    }

    /** Troca a tela visível com animação */
    _showScreen(screen) {
        this.state.screen = screen;

        // Esconde todas
        [this.telaInicio, this.telaSetup, this.telaPergunta, this.telaFinal].forEach(t => {
            t.classList.remove('ativa');
        });

        // Mostra a tela alvo
        const telas = {
            start: this.telaInicio,
            setup: this.telaSetup,
            question: this.telaPergunta,
            finished: this.telaFinal
        };

        const tela = telas[screen];
        if (tela) {
            tela.classList.add('ativa');
            // Re-trigger fade-in
            const container = tela.querySelector('.container, .pergunta-conteudo');
            if (container) {
                container.classList.remove('fade-in');
                void container.offsetWidth;
                container.classList.add('fade-in');
            }
        }

        // Foco no input da equipe 1 ao entrar no setup
        if (screen === 'setup') {
            setTimeout(() => this.inputEquipe1.focus(), 300);
        }
    }

    /** Inicia o quiz com os nomes das equipes */
    _startQuiz() {
        const nome1 = this.inputEquipe1.value.trim() || 'Coração Vivo';
        const nome2 = this.inputEquipe2.value.trim() || 'Amor em Ação';

        this.state.teams[1].name = nome1;
        this.state.teams[2].name = nome2;
        this.state.teams[1].score = 0;
        this.state.teams[2].score = 0;
        this.state.currentQuestion = 0;

        // Atualiza nomes no placar e painéis
        this.placarNome1.textContent = nome1;
        this.placarNome2.textContent = nome2;
        this.painelNome1.textContent = nome1;
        this.painelNome2.textContent = nome2;

        this._updateScoreboard();
        this._showScreen('question');
        this._showQuestion();
    }

    /** Renderiza a pergunta atual */
    _showQuestion() {
        const q = questions[this.state.currentQuestion];
        if (!q) return;

        // Reset do estado
        this.state.questionState = 'waiting';
        this.state.currentTeam = null;
        this.state.firstTeamTried = null;
        this.state.disabledOptions = [];
        this.bloqueado = false;

        // Atualiza progresso
        this._updateScoreboard();

        // Exibe a pergunta com animação
        this.perguntaTexto.textContent = q.question;
        this.perguntaTexto.classList.remove('fade-in');
        void this.perguntaTexto.offsetWidth;
        this.perguntaTexto.classList.add('fade-in');

        // Status inicial
        this._setStatus('Quem responde primeiro?', '');

        // Mostra painéis de equipe (ambos ativos e pulsando)
        this.paineisEquipe.style.display = 'flex';
        this.painelEquipe1.className = 'painel-equipe painel-equipe-1 pulse';
        this.painelEquipe2.className = 'painel-equipe painel-equipe-2 pulse';

        // Esconde alternativas e botão próxima
        this.alternativasDiv.innerHTML = '';
        this.btnProxima.style.display = 'none';
    }

    /** Seleciona qual equipe vai responder */
    _selectTeam(teamNum) {
        if (this.bloqueado) return;

        const st = this.state.questionState;

        // Só permite selecionar equipe no estado 'waiting' ou quando é segunda chance
        if (st === 'waiting') {
            this.state.firstTeamTried = teamNum;
        } else if (st === 'answered_wrong_first') {
            // Na segunda chance, só a outra equipe pode responder
            const outra = this.state.firstTeamTried === 1 ? 2 : 1;
            if (teamNum !== outra) return;
        } else {
            return;
        }

        this.sound.playClick();
        this.state.currentTeam = teamNum;
        this.state.questionState = 'team_selected';

        // Destaca equipe selecionada, opaco na outra
        const outraNum = teamNum === 1 ? 2 : 1;
        const painelSel = teamNum === 1 ? this.painelEquipe1 : this.painelEquipe2;
        const painelOutro = outraNum === 1 ? this.painelEquipe1 : this.painelEquipe2;

        painelSel.className = `painel-equipe painel-equipe-${teamNum} selecionado`;
        painelOutro.className = `painel-equipe painel-equipe-${outraNum} opaco`;

        this._setStatus(`${this.state.teams[teamNum].name} responde!`, this.state.teams[teamNum].color);

        // Mostra alternativas com animação slide-up
        this._renderOptions();
    }

    /** Renderiza as alternativas da pergunta */
    _renderOptions() {
        const q = questions[this.state.currentQuestion];
        this.alternativasDiv.innerHTML = '';

        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'alternativa';
            btn.dataset.letter = opt.letter;

            // Se a alternativa já foi eliminada (segunda chance)
            if (this.state.disabledOptions.includes(opt.letter)) {
                btn.classList.add('riscada');
            }

            btn.innerHTML = `<span class="letra">${opt.letter}</span><span>${opt.text}</span>`;

            if (!this.state.disabledOptions.includes(opt.letter)) {
                btn.addEventListener('click', () => this._selectAnswer(opt.letter));
            }

            this.alternativasDiv.appendChild(btn);

            // Animação slide-up escalonada
            setTimeout(() => {
                btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                btn.classList.add('visivel');
            }, 80 * (index + 1));
        });
    }

    /** Processa a seleção de uma alternativa */
    _selectAnswer(letter) {
        if (this.bloqueado) return;
        if (this.state.questionState !== 'team_selected') return;
        this.bloqueado = true;

        const q = questions[this.state.currentQuestion];
        const isCorrect = letter === q.correct;
        const teamNum = this.state.currentTeam;
        const isSecondChance = this.state.firstTeamTried !== null && this.state.firstTeamTried !== teamNum;

        // Marca a alternativa clicada
        const btns = this.alternativasDiv.querySelectorAll('.alternativa');
        btns.forEach(btn => {
            const l = btn.dataset.letter;
            if (l === letter) {
                btn.classList.add(isCorrect ? 'correta' : 'errada');
            }
            if (!isCorrect && l === q.correct) {
                // Não revela a correta ainda se for primeira tentativa
            }
            btn.classList.add('desabilitada');
        });

        if (isCorrect) {
            // ACERTOU!
            this.state.questionState = isSecondChance ? 'answered_correct_second' : 'answered_correct';
            this.state.teams[teamNum].score++;
            this.sound.playCorrect();
            this.confetti.burst(this.state.teams[teamNum].color);

            this._setStatus(`${this.state.teams[teamNum].name} acertou!`, this.state.teams[teamNum].color);
            this._updateScoreboard();
            this._animateScore(teamNum);

            // Mostra botão próxima
            setTimeout(() => {
                this.btnProxima.style.display = 'inline-block';
                this.bloqueado = false;
            }, 800);

        } else {
            // ERROU
            this.sound.playWrong();

            if (!isSecondChance) {
                // Primeira equipe errou — segunda chance para a outra
                this.state.questionState = 'answered_wrong_first';
                this.state.disabledOptions.push(letter);

                const outraNum = teamNum === 1 ? 2 : 1;
                const nomeOutra = this.state.teams[outraNum].name;

                this._setStatus(`Errou! Vez de ${nomeOutra}!`, this.state.teams[outraNum].color);

                // Toca som de atenção
                setTimeout(() => {
                    this.sound.playAttention();
                }, 400);

                // Após delay, mostra painéis para a outra equipe
                setTimeout(() => {
                    // Destaca a outra equipe
                    const painelOutro = outraNum === 1 ? this.painelEquipe1 : this.painelEquipe2;
                    const painelErrou = teamNum === 1 ? this.painelEquipe1 : this.painelEquipe2;

                    painelOutro.className = `painel-equipe painel-equipe-${outraNum} pulse`;
                    painelErrou.className = `painel-equipe painel-equipe-${teamNum} opaco`;

                    this.bloqueado = false;

                    // Auto-seleciona a outra equipe para responder
                    this._selectTeam(outraNum);
                }, 1200);

            } else {
                // Segunda equipe também errou — ninguém pontua
                this.state.questionState = 'answered_wrong_both';
                this._setStatus('Ninguém pontuou!', '#FF8C42');

                // Revela a resposta correta
                btns.forEach(btn => {
                    if (btn.dataset.letter === q.correct) {
                        btn.classList.remove('desabilitada');
                        btn.classList.add('revelada');
                    }
                });

                // Mostra botão próxima
                setTimeout(() => {
                    this.btnProxima.style.display = 'inline-block';
                    this.bloqueado = false;
                }, 800);
            }
        }
    }

    /** Avança para a próxima pergunta ou tela final */
    _nextQuestion() {
        this.state.currentQuestion++;

        if (this.state.currentQuestion >= questions.length) {
            this._showResults();
        } else {
            this._showQuestion();
        }
    }

    /** Mostra a tela de resultados */
    _showResults() {
        this._showScreen('finished');

        const s1 = this.state.teams[1].score;
        const s2 = this.state.teams[2].score;
        const n1 = this.state.teams[1].name;
        const n2 = this.state.teams[2].name;

        // Determina vencedor
        let msgDestaque = '';
        let coresConfete = [];

        if (s1 > s2) {
            msgDestaque = `🏆 ${n1} venceu! 🏆`;
            coresConfete = [this.state.teams[1].color, '#FFD93D', '#4CAF50'];
        } else if (s2 > s1) {
            msgDestaque = `🏆 ${n2} venceu! 🏆`;
            coresConfete = [this.state.teams[2].color, '#FFD93D', '#4CAF50'];
        } else {
            msgDestaque = 'Empate! 🤝';
            coresConfete = [this.state.teams[1].color, this.state.teams[2].color, '#FFD93D'];
        }

        this.resultadoDestaque.textContent = msgDestaque;

        // Placar final
        const vencedor1 = s1 > s2 ? 'vencedor' : '';
        const vencedor2 = s2 > s1 ? 'vencedor' : '';

        this.placarFinal.innerHTML = `
            <div class="placar-final-equipe ${vencedor1}">
                <div class="placar-final-nome">❤️ ${n1}</div>
                <div class="placar-final-pontos" style="color: ${this.state.teams[1].color}">${s1}</div>
            </div>
            <div class="placar-final-vs">✕</div>
            <div class="placar-final-equipe ${vencedor2}">
                <div class="placar-final-nome">🤝 ${n2}</div>
                <div class="placar-final-pontos" style="color: ${this.state.teams[2].color}">${s2}</div>
            </div>
        `;

        // Celebração
        this.sound.playCelebration();
        this.confetti.rain(coresConfete);
    }

    /** Reinicia o jogo */
    _restart() {
        this.confetti.stop();
        this.state.teams[1].score = 0;
        this.state.teams[2].score = 0;
        this.state.currentQuestion = 0;
        this._showScreen('setup');
    }

    /** Atualiza o placar no topo */
    _updateScoreboard() {
        const s1 = this.state.teams[1].score;
        const s2 = this.state.teams[2].score;

        this.placarPontos1.textContent = s1;
        this.placarPontos2.textContent = s2;

        // Progresso
        const num = this.state.currentQuestion + 1;
        const total = questions.length;
        this.placarProgresso.textContent = `Pergunta ${num} de ${total}`;
        this.barraFill.style.width = `${(num / total) * 100}%`;

        // Destaque para equipe na frente
        const pe1 = this.placarPontos1.closest('.placar-equipe');
        const pe2 = this.placarPontos2.closest('.placar-equipe');

        pe1.classList.toggle('na-frente', s1 > s2);
        pe2.classList.toggle('na-frente', s2 > s1);

        // Coroa
        this.coroa1.textContent = s1 > s2 ? '👑' : '';
        this.coroa2.textContent = s2 > s1 ? '👑' : '';
        this.coroa1.classList.toggle('visivel', s1 > s2);
        this.coroa2.classList.toggle('visivel', s2 > s1);
    }

    /** Animação de pulse no placar ao pontuar */
    _animateScore(teamNum) {
        const el = teamNum === 1 ? this.placarPontos1 : this.placarPontos2;
        el.classList.remove('pontuar');
        void el.offsetWidth;
        el.classList.add('pontuar');
    }

    /** Define a mensagem de status */
    _setStatus(text, color) {
        this.statusMsg.textContent = text;
        this.statusMsg.style.color = color || '#2C3E50';
        this.statusMsg.classList.remove('oculto');
    }

    /** Fullscreen */
    _toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }

    /** Controles via teclado */
    _handleKeyboard(e) {
        const key = e.key.toUpperCase();

        // Fullscreen
        if (key === 'F' && this.state.screen !== 'setup') {
            e.preventDefault();
            this._toggleFullscreen();
            return;
        }

        // Tela de pergunta
        if (this.state.screen !== 'question') return;

        // Selecionar equipe (1/Q para equipe 1, 2/W para equipe 2)
        if ((key === '1' || key === 'Q') && (this.state.questionState === 'waiting' || this.state.questionState === 'answered_wrong_first')) {
            this._selectTeam(1);
            return;
        }
        if ((key === '2' || key === 'W') && (this.state.questionState === 'waiting' || this.state.questionState === 'answered_wrong_first')) {
            this._selectTeam(2);
            return;
        }

        // Selecionar alternativa (A/B/C ou 7/8/9)
        if (this.state.questionState === 'team_selected' && !this.bloqueado) {
            const letterMap = { 'A': 'A', 'B': 'B', 'C': 'C', '7': 'A', '8': 'B', '9': 'C' };
            if (letterMap[key]) {
                const letter = letterMap[key];
                if (!this.state.disabledOptions.includes(letter)) {
                    this._selectAnswer(letter);
                }
                return;
            }
        }

        // Próxima pergunta (Enter ou seta direita)
        if ((key === 'ENTER' || key === 'ARROWRIGHT') && this.btnProxima.style.display !== 'none') {
            this.sound.playClick();
            this._nextQuestion();
            return;
        }
    }
}

// Inicializa o app quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});
