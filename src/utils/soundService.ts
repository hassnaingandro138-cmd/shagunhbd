/**
 * Web Audio API synthesizer for sound effects and background ambient birthday music.
 * 100% self-contained, zero external audio dependency required.
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicPlaying = false;
  private isMuted = false;
  private volume = 0.6;
  private musicInterval: any = null;
  private currentNoteIndex = 0;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.musicGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();

        this.musicGain.gain.setValueAtTime(this.volume * 0.45, this.ctx.currentTime);
        this.sfxGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

        this.musicGain.connect(this.ctx.destination);
        this.sfxGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- Sound Effects ---

  playPop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);

      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      // Noise burst for realistic latex pop
      const bufferSize = this.ctx.sampleRate * 0.04;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1200;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.7, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      noise.start(now);
      osc.stop(now + 0.09);
      noise.stop(now + 0.05);
    } catch {
      // Audio context error ignore
    }
  }

  playCandleBlow() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const duration = 0.8;

      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(300, now + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.7, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(now);
      noise.stop(now + duration);
    } catch {}
  }

  playSparkle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteTime = now + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.3, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.36);
      });
    } catch {}
  }

  playFirework() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;

      // Deep boom
      const osc = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.6);

      boomGain.gain.setValueAtTime(0.9, now);
      boomGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

      osc.connect(boomGain);
      boomGain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.65);

      // Sparkle crackle
      setTimeout(() => {
        this.playSparkle();
      }, 150);
    } catch {}
  }

  playHug() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.sfxGain) return;

      const chords = [392.0, 493.88, 587.33, 783.99]; // G major warm chord
      const now = this.ctx.currentTime;

      chords.forEach((freq) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 1.25);
      });
    } catch {}
  }

  // --- Background Music: Sweet Birthday Lofi Melody & Chimes ---

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.playMusic();
      return true;
    }
  }

  playMusic() {
    this.initCtx();
    if (!this.ctx || !this.musicGain) return;

    this.isMusicPlaying = true;
    if (this.musicInterval) clearInterval(this.musicInterval);

    // Melody notes for sweet music-box birthday celebration
    // Frequencies for "Happy Birthday to You" + dreamy transitions
    const melody = [
      { f: 261.63, d: 0.3 }, // C4
      { f: 261.63, d: 0.3 }, // C4
      { f: 293.66, d: 0.6 }, // D4
      { f: 261.63, d: 0.6 }, // C4
      { f: 349.23, d: 0.6 }, // F4
      { f: 329.63, d: 1.1 }, // E4
      { f: 0, d: 0.3 },      // Rest

      { f: 261.63, d: 0.3 }, // C4
      { f: 261.63, d: 0.3 }, // C4
      { f: 293.66, d: 0.6 }, // D4
      { f: 261.63, d: 0.6 }, // C4
      { f: 392.0, d: 0.6 },  // G4
      { f: 349.23, d: 1.1 }, // F4
      { f: 0, d: 0.3 },      // Rest

      { f: 261.63, d: 0.3 }, // C4
      { f: 261.63, d: 0.3 }, // C4
      { f: 523.25, d: 0.6 }, // C5
      { f: 440.0, d: 0.6 },  // A4
      { f: 349.23, d: 0.6 }, // F4
      { f: 329.63, d: 0.6 }, // E4
      { f: 293.66, d: 0.9 }, // D4
      { f: 0, d: 0.3 },      // Rest

      { f: 466.16, d: 0.3 }, // Bb4
      { f: 466.16, d: 0.3 }, // Bb4
      { f: 440.0, d: 0.6 },  // A4
      { f: 349.23, d: 0.6 }, // F4
      { f: 392.0, d: 0.6 },  // G4
      { f: 349.23, d: 1.4 }, // F4
      { f: 0, d: 0.5 },      // Rest
    ];

    const step = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;
      const note = melody[this.currentNoteIndex];
      this.currentNoteIndex = (this.currentNoteIndex + 1) % melody.length;

      if (note.f > 0 && !this.isMuted) {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Music box / Celesta timbre (sine with gentle warm overtone)
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(note.f, now);

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.2, now + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + note.d * 0.95);

        osc.connect(noteGain);
        noteGain.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + note.d);

        // Soft sub-octave harmony
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(note.f / 2, now);
        subGain.gain.setValueAtTime(0.001, now);
        subGain.gain.linearRampToValueAtTime(0.08, now + 0.05);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + note.d * 0.9);

        subOsc.connect(subGain);
        subGain.connect(this.musicGain);
        subOsc.start(now);
        subOsc.stop(now + note.d);
      }

      const nextDelay = note.d * 1000;
      this.musicInterval = setTimeout(step, nextDelay);
    };

    step();
  }

  pauseMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.musicGain && this.sfxGain) {
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.45, this.ctx.currentTime);
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  getPlaying() {
    return this.isMusicPlaying;
  }

  getMuted() {
    return this.isMuted;
  }

  getVolume() {
    return this.volume;
  }
}

export const soundService = new SoundService();
