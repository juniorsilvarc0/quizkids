/**
 * Quiz Igreja Viva — Gerenciador de Confetes
 * Animação de partículas via Canvas API
 */

class ConfettiManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particulas = [];
        this.animando = false;
        this.animId = null;
        this.modo = null; // 'burst' ou 'rain'

        this._resize();
        window.addEventListener('resize', () => this._resize());
    }

    /** Ajusta o canvas ao tamanho da tela */
    _resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /** Cria uma partícula de confete */
    _criarParticula(cor, x, y, modo) {
        const isBurst = modo === 'burst';
        return {
            x: x !== undefined ? x : Math.random() * this.canvas.width,
            y: y !== undefined ? y : (isBurst ? this.canvas.height * 0.4 : -10),
            vx: isBurst ? (Math.random() - 0.5) * 12 : (Math.random() - 0.5) * 3,
            vy: isBurst ? -(Math.random() * 8 + 4) : Math.random() * 2 + 1,
            cor: cor,
            tamanho: Math.random() * 8 + 4,
            rotacao: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.15,
            gravidade: 0.15,
            vida: 1,
            decaimento: isBurst ? 0.008 + Math.random() * 0.005 : 0.002 + Math.random() * 0.002,
            forma: Math.random() > 0.5 ? 'rect' : 'circle'
        };
    }

    /** Explosão curta de confetes (para acertos) */
    burst(cor) {
        this.modo = 'burst';
        const cores = cor ? [cor, this._clarear(cor), '#FFE66D'] : ['#4ECDC4', '#FF6B6B', '#FFE66D', '#51CF66', '#764ba2'];
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height * 0.4;

        for (let i = 0; i < 60; i++) {
            const c = cores[Math.floor(Math.random() * cores.length)];
            this.particulas.push(this._criarParticula(c, cx + (Math.random() - 0.5) * 100, cy, 'burst'));
        }

        if (!this.animando) {
            this.animando = true;
            this._animar();
        }
    }

    /** Chuva contínua de confetes (para tela final) */
    rain(cores) {
        this.modo = 'rain';
        this._coresRain = cores || ['#4ECDC4', '#FF6B6B', '#FFE66D', '#51CF66', '#764ba2'];

        if (!this.animando) {
            this.animando = true;
            this._animar();
        }
    }

    /** Para a animação */
    stop() {
        this.animando = false;
        this.modo = null;
        if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
        }
        this.particulas = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /** Clareia uma cor hex */
    _clarear(hex) {
        const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 60);
        const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 60);
        const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + 60);
        return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    }

    /** Loop de animação */
    _animar() {
        if (!this.animando) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Gerar novas partículas no modo chuva
        if (this.modo === 'rain' && this.particulas.length < 120) {
            for (let i = 0; i < 2; i++) {
                const c = this._coresRain[Math.floor(Math.random() * this._coresRain.length)];
                this.particulas.push(this._criarParticula(c, undefined, undefined, 'rain'));
            }
        }

        // Atualizar e desenhar partículas
        for (let i = this.particulas.length - 1; i >= 0; i--) {
            const p = this.particulas[i];

            // Física
            p.vy += p.gravidade;
            p.x += p.vx;
            p.y += p.vy;
            p.rotacao += p.vr;
            p.vida -= p.decaimento;

            // Remover partículas mortas ou fora da tela
            if (p.vida <= 0 || p.y > this.canvas.height + 20) {
                this.particulas.splice(i, 1);
                continue;
            }

            // Desenhar
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotacao);
            this.ctx.globalAlpha = p.vida;
            this.ctx.fillStyle = p.cor;

            if (p.forma === 'rect') {
                this.ctx.fillRect(-p.tamanho / 2, -p.tamanho / 4, p.tamanho, p.tamanho / 2);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.tamanho / 2, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        // Parar se não há mais partículas e não é modo chuva
        if (this.particulas.length === 0 && this.modo !== 'rain') {
            this.animando = false;
            this.animId = null;
            return;
        }

        this.animId = requestAnimationFrame(() => this._animar());
    }
}
