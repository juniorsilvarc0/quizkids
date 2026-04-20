/**
 * Reconectando — Identidade Original — Gerenciador de Sons
 * Sons sintetizados via Web Audio API (sem arquivos externos)
 */

class SoundManager {
    constructor() {
        this.ctx = null;
        this.inicializado = false;
    }

    /** Inicializa o AudioContext (chamar no primeiro clique do usuário) */
    init() {
        if (this.inicializado) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.inicializado = true;
        } catch (e) {
            console.warn('Web Audio API não disponível');
        }
    }

    /** Toca uma nota com frequência, início, duração e volume */
    _playNote(freq, start, duration, volume, type) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume || 0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
    }

    /** Som de acerto — acorde maior ascendente (C4-E4-G4) */
    playCorrect() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // C4 = 261.63, E4 = 329.63, G4 = 392.00
        this._playNote(261.63, now, 0.4, 0.25, 'sine');
        this._playNote(329.63, now + 0.08, 0.35, 0.25, 'sine');
        this._playNote(392.00, now + 0.16, 0.3, 0.3, 'sine');
    }

    /** Som de erro — tom descendente curto */
    playWrong() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    }

    /** Som de clique/seleção — blip curto */
    playClick() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        this._playNote(880, now, 0.1, 0.15, 'sine');
    }

    /** Som de segunda chance — dois bips rápidos de atenção */
    playAttention() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        this._playNote(660, now, 0.12, 0.2, 'square');
        this._playNote(880, now + 0.15, 0.12, 0.2, 'square');
    }

    /** Som de celebração final — arpejo alegre (C4-E4-G4-C5) */
    playCelebration() {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        // C4, E4, G4, C5
        this._playNote(261.63, now, 0.5, 0.2, 'sine');
        this._playNote(329.63, now + 0.15, 0.45, 0.2, 'sine');
        this._playNote(392.00, now + 0.30, 0.4, 0.25, 'sine');
        this._playNote(523.25, now + 0.45, 0.55, 0.3, 'sine');
        // Acorde final
        this._playNote(261.63, now + 0.65, 0.6, 0.15, 'triangle');
        this._playNote(329.63, now + 0.65, 0.6, 0.15, 'triangle');
        this._playNote(392.00, now + 0.65, 0.6, 0.15, 'triangle');
        this._playNote(523.25, now + 0.65, 0.6, 0.2, 'triangle');
    }
}
