// ponytail: clean background music manager with immediate stop, rewind, and gesture unlock
import backgroundMusicAudio from '@/assets/background-music.mp3';

class BackgroundMusicManager {
  private audio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.25;
  private gestureBound: boolean = false;
  private isAllowed: boolean = false;

  private init() {
    if (this.audio) return;
    this.audio = new Audio(backgroundMusicAudio);
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = this.isMuted ? 0 : this.volume;
  }

  private handleGesture = () => {
    if (!this.isAllowed) {
      this.unbindGesture();
      return;
    }
    this.audio?.play()
      .then(() => this.unbindGesture())
      .catch(() => {
        // Still blocked — keep listener
      });
  };

  private bindGesture() {
    if (this.gestureBound) return;
    this.gestureBound = true;
    window.addEventListener('pointerdown', this.handleGesture, { passive: true });
    window.addEventListener('touchend', this.handleGesture, { passive: true });
    window.addEventListener('click', this.handleGesture, { passive: true });
    window.addEventListener('keydown', this.handleGesture, { passive: true });
  }

  private unbindGesture() {
    if (!this.gestureBound) return;
    this.gestureBound = false;
    window.removeEventListener('pointerdown', this.handleGesture);
    window.removeEventListener('touchend', this.handleGesture);
    window.removeEventListener('click', this.handleGesture);
    window.removeEventListener('keydown', this.handleGesture);
  }

  public start(fromStart: boolean = false) {
    this.isAllowed = true;
    this.init();
    if (!this.audio) return;
    if (fromStart) {
      try {
        this.audio.currentTime = 0;
      } catch {}
    }
    this.audio.volume = this.isMuted ? 0 : this.volume;
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => this.unbindGesture())
        .catch(() => {
          // Autoplay blocked by browser policy: arm user gesture listener
          if (this.isAllowed) {
            this.bindGesture();
          }
        });
    }
  }

  public stop() {
    this.isAllowed = false;
    this.unbindGesture();
    if (this.audio) {
      this.audio.pause();
      try {
        this.audio.currentTime = 0;
      } catch {}
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.audio) {
      this.audio.volume = muted ? 0 : this.volume;
    }
  }
}

export const backgroundMusic = new BackgroundMusicManager();
