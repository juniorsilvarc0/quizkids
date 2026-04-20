/**
 * Reconectando — Identidade Original — Lógica Principal
 * Jogo de quiz bíblico por equipes (2 a 6 equipes dinâmicas)
 */

class QuizApp {
    constructor() {
        /** Paleta de cores para até 6 equipes */
        this.TEAM_PALETTE = [
            { color: '#E74C3C', colorLight: '#FDEDEC', colorGlow: 'rgba(231,76,60,0.4)' },
            { color: '#3B82F6', colorLight: '#EBF5FB', colorGlow: 'rgba(59,130,246,0.4)' },
            { color: '#27AE60', colorLight: '#EAFAF1', colorGlow: 'rgba(39,174,96,0.4)' },
            { color: '#8E44AD', colorLight: '#F4ECF7', colorGlow: 'rgba(142,68,173,0.4)' },
            { color: '#F39C12', colorLight: '#FEF5E7', colorGlow: 'rgba(243,156,18,0.4)' },
            { color: '#E91E63', colorLight: '#FCE4EC', colorGlow: 'rgba(233,30,99,0.4)' }
        ];

        /** Emojis padrão na ordem de criação */
        this.DEFAULT_EMOJIS = ['❤️', '⭐', '🔥', '💎', '🌟', '🎯'];
        // Nomes sugeridos por posição — o usuário pode renomear livremente
        this.DEFAULT_NAMES = ['Confiança', 'Caminho', 'Escolhas', 'Bondade', 'Santidade', 'Paz'];

        /** Emojis disponíveis no picker */
        this.PICKER_EMOJIS = ['❤️', '⭐', '🔥', '💎', '🌟', '🎯', '👑', '🦁', '🐉', '🦅', '🎵', '⚡'];

        this.MAX_TEAMS = 6;
        this.MIN_TEAMS = 2;
        this._nextId = 1;

        /** Estado do jogo */
        this.state = {
            screen: 'start',
            questionState: 'waiting',
            currentQuestion: 0,
            currentTeam: null,
            teamsTriedThisQuestion: [],
            disabledOptions: [],
            teams: []
        };

        this.sound = new SoundManager();
        this.confetti = new ConfettiManager('confetti-canvas');
        this.bloqueado = false;
        this._activeEmojiPicker = null;

        this._cacheDOM();
        this._initDefaultTeams();
        this._bindEvents();
        this._renderSetupTeams();
    }

    /** Referências aos elementos do DOM */
    _cacheDOM() {
        this.telaInicio = document.getElementById('tela-inicio');
        this.telaSetup = document.getElementById('tela-setup');
        this.telaPergunta = document.getElementById('tela-pergunta');
        this.telaFinal = document.getElementById('tela-final');

        this.setupContainer = document.getElementById('setup-equipes-container');
        this.btnAdicionarEquipe = document.getElementById('btn-adicionar-equipe');
        this.btnIniciar = document.getElementById('btn-iniciar');

        this.placarTopo = document.getElementById('placar-topo');
        this.perguntaTexto = document.getElementById('pergunta-texto');
        this.statusMsg = document.getElementById('status-msg');
        this.paineisEquipe = document.getElementById('paineis-equipe');
        this.alternativasDiv = document.getElementById('alternativas');
        this.btnProxima = document.getElementById('btn-proxima');

        this.resultadoDestaque = document.getElementById('resultado-destaque');
        this.placarFinal = document.getElementById('placar-final');

        this.btnComecar = document.getElementById('btn-comecar');
        this.btnReiniciar = document.getElementById('btn-reiniciar');
        this.btnFullscreen = document.getElementById('btn-fullscreen');
    }

    /** Cria as 2 equipes padrão */
    _initDefaultTeams() {
        this.state.teams = [
            this._createTeam(this.DEFAULT_NAMES[0], this.DEFAULT_EMOJIS[0], 0),
            this._createTeam(this.DEFAULT_NAMES[1], this.DEFAULT_EMOJIS[1], 1)
        ];
    }

    /** Cria um objeto de equipe */
    _createTeam(name, emoji, paletteIndex) {
        const palette = this.TEAM_PALETTE[paletteIndex % this.TEAM_PALETTE.length];
        return {
            id: this._nextId++,
            name: name,
            score: 0,
            emoji: emoji,
            paletteIndex: paletteIndex,
            color: palette.color,
            colorLight: palette.colorLight,
            colorGlow: palette.colorGlow
        };
    }

    /** Bindagem de eventos */
    _bindEvents() {
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

        this.btnAdicionarEquipe.addEventListener('click', () => {
            this.sound.playClick();
            this._addTeam();
        });

        this.btnFullscreen.addEventListener('click', () => this._toggleFullscreen());

        document.addEventListener('keydown', (e) => this._handleKeyboard(e));

        // Fechar emoji picker ao clicar fora
        document.addEventListener('click', (e) => {
            if (this._activeEmojiPicker && !e.target.closest('.emoji-picker') && !e.target.closest('.setup-emoji')) {
                this._closeEmojiPicker();
            }
        });
    }

    /** Troca a tela visível com animação */
    _showScreen(screen) {
        this.state.screen = screen;

        [this.telaInicio, this.telaSetup, this.telaPergunta, this.telaFinal].forEach(t => {
            t.classList.remove('ativa');
        });

        const telas = {
            start: this.telaInicio,
            setup: this.telaSetup,
            question: this.telaPergunta,
            finished: this.telaFinal
        };

        const tela = telas[screen];
        if (tela) {
            tela.classList.add('ativa');
            const container = tela.querySelector('.container, .pergunta-conteudo');
            if (container) {
                container.classList.remove('fade-in');
                void container.offsetWidth;
                container.classList.add('fade-in');
            }
        }

        if (screen === 'setup') {
            this._renderSetupTeams();
            setTimeout(() => {
                const firstInput = this.setupContainer.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 300);
        }
    }

    /* =========================================
       SETUP — Renderização dinâmica de equipes
       ========================================= */

    /** Renderiza todos os cards de equipe no setup */
    _renderSetupTeams() {
        this.setupContainer.innerHTML = '';
        const teams = this.state.teams;

        teams.forEach((team, index) => {
            // VS separator antes de cada equipe (exceto a primeira)
            if (index > 0) {
                const vs = document.createElement('div');
                vs.className = 'setup-vs';
                vs.textContent = 'VS';
                this.setupContainer.appendChild(vs);
            }

            const card = this._createSetupCard(team, index);
            this.setupContainer.appendChild(card);
        });

        // Mostrar/esconder botão "+"
        this.btnAdicionarEquipe.classList.toggle('oculto', teams.length >= this.MAX_TEAMS);

        // Mostrar/esconder botões "✕"
        const removeBtns = this.setupContainer.querySelectorAll('.btn-remover');
        removeBtns.forEach(btn => {
            btn.classList.toggle('oculto', teams.length <= this.MIN_TEAMS);
        });
    }

    /** Cria um card de equipe individual para o setup */
    _createSetupCard(team, index) {
        const card = document.createElement('div');
        card.className = 'setup-equipe';
        card.dataset.teamId = team.id;
        card.style.setProperty('--team-color', team.color);
        card.style.setProperty('--team-light', team.colorLight);
        card.style.setProperty('--team-glow', team.colorGlow);
        card.style.borderColor = team.color;
        card.style.background = `linear-gradient(180deg, ${team.colorLight}, ${this._darkenLight(team.colorLight)})`;
        card.style.boxShadow = `0 8px 0px color-mix(in srgb, ${team.color} 70%, black), 0 12px 30px ${team.colorGlow}`;

        // Emoji (clicável para picker)
        const emoji = document.createElement('span');
        emoji.className = 'setup-emoji';
        emoji.textContent = team.emoji;
        emoji.addEventListener('click', (e) => {
            e.stopPropagation();
            this._toggleEmojiPicker(team.id, emoji);
        });

        // Label
        const label = document.createElement('label');
        label.textContent = `Equipe ${index + 1}`;

        // Input para nome
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Nome do time';
        input.maxLength = 24;
        input.autocomplete = 'off';
        input.value = team.name;
        input.style.borderColor = team.color + '4D';
        input.addEventListener('input', () => {
            team.name = input.value;
        });

        // Botão remover
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-remover';
        removeBtn.textContent = '✕';
        removeBtn.addEventListener('click', () => {
            this.sound.playClick();
            this._removeTeam(team.id);
        });

        card.appendChild(removeBtn);
        card.appendChild(emoji);
        card.appendChild(label);
        card.appendChild(input);

        return card;
    }

    /** Escurece levemente uma cor light para gradiente */
    _darkenLight(hex) {
        const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 20);
        const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 20);
        const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 20);
        return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    }

    /** Adiciona uma nova equipe */
    _addTeam() {
        if (this.state.teams.length >= this.MAX_TEAMS) return;

        const nextIndex = this.state.teams.length;
        const emoji = this.DEFAULT_EMOJIS[nextIndex % this.DEFAULT_EMOJIS.length];
        const name = this.DEFAULT_NAMES[nextIndex] || `Equipe ${nextIndex + 1}`;
        const team = this._createTeam(name, emoji, nextIndex);

        this.state.teams.push(team);
        this._renderSetupTeams();
    }

    /** Remove uma equipe pelo ID */
    _removeTeam(teamId) {
        if (this.state.teams.length <= this.MIN_TEAMS) return;
        this.state.teams = this.state.teams.filter(t => t.id !== teamId);
        this._renderSetupTeams();
    }

    /** Abre/fecha o emoji picker para uma equipe */
    _toggleEmojiPicker(teamId, emojiEl) {
        this._closeEmojiPicker();

        const picker = document.createElement('div');
        picker.className = 'emoji-picker';

        this.PICKER_EMOJIS.forEach(em => {
            const btn = document.createElement('button');
            btn.textContent = em;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const team = this.state.teams.find(t => t.id === teamId);
                if (team) {
                    team.emoji = em;
                    emojiEl.textContent = em;
                }
                this._closeEmojiPicker();
            });
            picker.appendChild(btn);
        });

        emojiEl.parentElement.appendChild(picker);
        this._activeEmojiPicker = picker;
    }

    /** Fecha o emoji picker ativo */
    _closeEmojiPicker() {
        if (this._activeEmojiPicker) {
            this._activeEmojiPicker.remove();
            this._activeEmojiPicker = null;
        }
    }

    /* =========================================
       QUIZ — Início e fluxo
       ========================================= */

    /** Inicia o quiz com os nomes das equipes */
    _startQuiz() {
        // Lê os nomes dos inputs do setup
        const inputs = this.setupContainer.querySelectorAll('input');
        inputs.forEach((input, i) => {
            if (this.state.teams[i]) {
                this.state.teams[i].name = input.value.trim() || this.state.teams[i].name;
            }
        });

        // Reset scores
        this.state.teams.forEach(t => t.score = 0);
        this.state.currentQuestion = 0;

        this._renderPlacarTopo();
        this._showScreen('question');
        this._showQuestion();
    }

    /** Renderiza o placar no topo (dinâmico para N equipes) */
    _renderPlacarTopo() {
        const teams = this.state.teams;
        this.placarTopo.innerHTML = '';

        // Adicionar classe compacta se muitas equipes
        this.placarTopo.classList.toggle('placar-topo-compact', teams.length > 3);

        teams.forEach((team, i) => {
            const div = document.createElement('div');
            div.className = 'placar-equipe';
            div.dataset.teamId = team.id;
            div.style.setProperty('--team-color', team.color);
            div.style.setProperty('--team-light', team.colorLight);
            div.style.setProperty('--team-glow', team.colorGlow);
            div.style.background = team.colorLight;
            div.style.borderColor = 'rgba(0,0,0,0.1)';

            div.innerHTML = `
                <span class="placar-coroa" data-coroa="${team.id}"></span>
                <span class="placar-emoji">${team.emoji}</span>
                <span class="placar-nome">${team.name}</span>
                <span class="placar-pontos" data-pontos="${team.id}">${team.score}</span>
            `;

            this.placarTopo.appendChild(div);

            // Adicionar centro de progresso após o último time da primeira "metade" ou no meio
            if (i === Math.floor((teams.length - 1) / 2)) {
                const centro = document.createElement('div');
                centro.className = 'placar-centro';
                centro.innerHTML = `
                    <span id="placar-progresso">Pergunta 1 de ${questions.length}</span>
                    <div class="barra-progresso">
                        <div class="barra-progresso-fill" id="barra-fill"></div>
                    </div>
                `;
                this.placarTopo.appendChild(centro);
            }
        });
    }

    /** Renderiza a pergunta atual */
    _showQuestion() {
        const q = questions[this.state.currentQuestion];
        if (!q) return;

        this.state.questionState = 'waiting';
        this.state.currentTeam = null;
        this.state.teamsTriedThisQuestion = [];
        this.state.disabledOptions = [];
        this.bloqueado = false;

        this._updateScoreboard();

        this.perguntaTexto.textContent = q.question;
        this.perguntaTexto.classList.remove('fade-in');
        void this.perguntaTexto.offsetWidth;
        this.perguntaTexto.classList.add('fade-in');

        this._setStatus('Quem responde primeiro?', '');

        this._renderTeamPanels();

        this.alternativasDiv.innerHTML = '';
        this.btnProxima.style.display = 'none';
    }

    /** Renderiza os painéis de seleção de equipe */
    _renderTeamPanels(onlyAvailable) {
        this.paineisEquipe.innerHTML = '';
        this.paineisEquipe.style.display = 'flex';

        // Label
        const label = document.createElement('div');
        label.className = 'paineis-label';
        label.textContent = 'Quem responde?';
        this.paineisEquipe.appendChild(label);

        const teams = this.state.teams;
        teams.forEach((team, index) => {
            const tried = this.state.teamsTriedThisQuestion.includes(team.id);

            const btn = document.createElement('button');
            btn.className = 'painel-equipe pulse';
            btn.dataset.teamId = team.id;
            btn.style.setProperty('--team-color', team.color);
            btn.style.setProperty('--team-light', team.colorLight);
            btn.style.setProperty('--team-glow', team.colorGlow);

            if (tried) {
                btn.classList.remove('pulse');
                btn.classList.add('desativado');
            }

            btn.innerHTML = `
                <span class="painel-emoji">${team.emoji}</span>
                <span class="painel-nome">${team.name}</span>
            `;

            if (!tried) {
                btn.addEventListener('click', () => this._selectTeam(team.id));
            }

            this.paineisEquipe.appendChild(btn);
        });
    }

    /** Seleciona qual equipe vai responder */
    _selectTeam(teamId) {
        if (this.bloqueado) return;

        const st = this.state.questionState;
        const team = this.state.teams.find(t => t.id === teamId);
        if (!team) return;

        // Só permite selecionar equipe que ainda não tentou
        if (this.state.teamsTriedThisQuestion.includes(teamId)) return;

        if (st !== 'waiting' && st !== 'second_chance') return;

        this.sound.playClick();
        this.state.currentTeam = teamId;
        this.state.questionState = 'team_selected';

        // Destaca equipe selecionada, opaco nas outras
        const panels = this.paineisEquipe.querySelectorAll('.painel-equipe');
        panels.forEach(p => {
            const pid = parseInt(p.dataset.teamId);
            if (pid === teamId) {
                p.className = 'painel-equipe selecionado';
                p.style.setProperty('--team-color', team.color);
                p.style.setProperty('--team-light', team.colorLight);
                p.style.setProperty('--team-glow', team.colorGlow);
            } else if (this.state.teamsTriedThisQuestion.includes(pid)) {
                p.className = 'painel-equipe desativado';
            } else {
                p.className = 'painel-equipe opaco';
            }
        });

        this._setStatus(`${team.name} responde!`, team.color);

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

            if (this.state.disabledOptions.includes(opt.letter)) {
                btn.classList.add('riscada');
            }

            btn.innerHTML = `<span class="letra">${opt.letter}</span><span>${opt.text}</span>`;

            if (!this.state.disabledOptions.includes(opt.letter)) {
                btn.addEventListener('click', () => this._selectAnswer(opt.letter));
            }

            this.alternativasDiv.appendChild(btn);

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
        const teamId = this.state.currentTeam;
        const team = this.state.teams.find(t => t.id === teamId);

        // Marca a equipe como tendo tentado
        this.state.teamsTriedThisQuestion.push(teamId);

        const btns = this.alternativasDiv.querySelectorAll('.alternativa');
        btns.forEach(btn => {
            const l = btn.dataset.letter;
            if (l === letter) {
                btn.classList.add(isCorrect ? 'correta' : 'errada');
            }
            btn.classList.add('desabilitada');
        });

        if (isCorrect) {
            this.state.questionState = 'answered_correct';
            team.score++;
            this.sound.playCorrect();
            this.confetti.burst(team.color);

            this._setStatus(`${team.name} acertou!`, team.color);
            this._updateScoreboard();
            this._animateScore(teamId);

            setTimeout(() => {
                this.btnProxima.style.display = 'inline-block';
                this.bloqueado = false;
            }, 800);

        } else {
            this.sound.playWrong();
            this.state.disabledOptions.push(letter);

            // Verificar se restam equipes que ainda não tentaram
            const remaining = this.state.teams.filter(t => !this.state.teamsTriedThisQuestion.includes(t.id));

            if (remaining.length > 0) {
                // Ainda há equipes que podem tentar
                this.state.questionState = 'second_chance';

                this._setStatus('Errou! Quem tenta agora?', '#FF8C42');

                setTimeout(() => {
                    this.sound.playAttention();
                }, 400);

                setTimeout(() => {
                    this._renderTeamPanels(true);
                    this.bloqueado = false;
                }, 1200);

            } else {
                // Todas as equipes erraram
                this.state.questionState = 'answered_wrong_all';
                this._setStatus('Ninguém pontuou!', '#FF8C42');

                btns.forEach(btn => {
                    if (btn.dataset.letter === q.correct) {
                        btn.classList.remove('desabilitada');
                        btn.classList.add('revelada');
                    }
                });

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

        const teams = this.state.teams;
        const sorted = [...teams].sort((a, b) => b.score - a.score);
        const maxScore = sorted[0].score;
        const winners = sorted.filter(t => t.score === maxScore);

        // Mensagem de destaque
        let msgDestaque = '';
        if (winners.length === teams.length) {
            msgDestaque = 'Empate geral! 🤝';
        } else if (winners.length === 1) {
            msgDestaque = `🏆 ${winners[0].name} venceu! 🏆`;
        } else {
            const names = winners.map(w => w.name).join(' e ');
            msgDestaque = `🏆 Empate entre ${names}! 🏆`;
        }

        this.resultadoDestaque.textContent = msgDestaque;

        // Placar final ordenado
        this.placarFinal.innerHTML = '';
        sorted.forEach((team, i) => {
            const isWinner = team.score === maxScore;
            const div = document.createElement('div');
            div.className = 'placar-final-equipe' + (isWinner ? ' vencedor' : '');

            div.innerHTML = `
                <div class="placar-final-nome">${team.emoji} ${team.name}</div>
                <div class="placar-final-pontos" style="color: ${team.color}">${team.score}</div>
            `;

            this.placarFinal.appendChild(div);
        });

        // Confetes com cores dos vencedores
        const coresConfete = winners.map(w => w.color).concat(['#FFD93D']);
        this.sound.playCelebration();
        this.confetti.rain(coresConfete);
    }

    /** Reinicia o jogo */
    _restart() {
        this.confetti.stop();
        this.state.teams.forEach(t => t.score = 0);
        this.state.currentQuestion = 0;
        this._showScreen('setup');
    }

    /** Atualiza o placar no topo */
    _updateScoreboard() {
        const teams = this.state.teams;
        const maxScore = Math.max(...teams.map(t => t.score));
        const hasLeader = maxScore > 0;

        teams.forEach(team => {
            const pontosEl = this.placarTopo.querySelector(`[data-pontos="${team.id}"]`);
            const coroaEl = this.placarTopo.querySelector(`[data-coroa="${team.id}"]`);
            const equipEl = pontosEl ? pontosEl.closest('.placar-equipe') : null;

            if (pontosEl) pontosEl.textContent = team.score;

            if (coroaEl) {
                const isLeader = hasLeader && team.score === maxScore;
                coroaEl.textContent = isLeader ? '👑' : '';
                coroaEl.classList.toggle('visivel', isLeader);
            }

            if (equipEl) {
                const isLeader = hasLeader && team.score === maxScore;
                equipEl.classList.toggle('na-frente', isLeader);
                if (isLeader) {
                    equipEl.style.borderColor = team.color;
                } else {
                    equipEl.style.borderColor = 'rgba(0,0,0,0.1)';
                }
            }
        });

        // Progresso
        const progressoEl = document.getElementById('placar-progresso');
        const barraEl = document.getElementById('barra-fill');
        if (progressoEl && barraEl) {
            const num = this.state.currentQuestion + 1;
            const total = questions.length;
            progressoEl.textContent = `Pergunta ${num} de ${total}`;
            barraEl.style.width = `${(num / total) * 100}%`;
        }
    }

    /** Animação de pulse no placar ao pontuar */
    _animateScore(teamId) {
        const el = this.placarTopo.querySelector(`[data-pontos="${teamId}"]`);
        if (el) {
            el.classList.remove('pontuar');
            void el.offsetWidth;
            el.classList.add('pontuar');
        }
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

        // Selecionar equipe (teclas 1-6)
        if (key >= '1' && key <= '6') {
            const index = parseInt(key) - 1;
            if (this.state.questionState === 'waiting' || this.state.questionState === 'second_chance') {
                const team = this.state.teams[index];
                if (team && !this.state.teamsTriedThisQuestion.includes(team.id)) {
                    this._selectTeam(team.id);
                }
            }
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
