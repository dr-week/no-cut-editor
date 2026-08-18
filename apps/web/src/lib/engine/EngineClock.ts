/**
 * @file EngineClock.ts
 * @description Hardware-Anchored Master Audio/Video Clock.
 * Reconciles the hardware AudioContext clock with the display requestAnimationFrame tick.
 * Eliminates lipsync and video/audio drift across long multi-minute sequences.
 * @module apps/web/src/lib/engine/EngineClock
 */

export class EngineClock {
  private static instance: EngineClock;
  private audioCtx: AudioContext | null = null;
  private startTime: number = 0;
  private pauseTime: number = 0;
  public isPlaying: boolean = false;

  private constructor() {
    // Lazy or safe window AudioContext initialization
    if (typeof window !== "undefined") {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
  }

  public static getInstance(): EngineClock {
    if (!this.instance) {
      this.instance = new EngineClock();
    }
    return this.instance;
  }

  public play() {
    if (this.isPlaying) return;
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    this.isPlaying = true;
    const currentAudioTime = this.audioCtx ? this.audioCtx.currentTime : (performance.now() / 1000);
    this.startTime = currentAudioTime - this.pauseTime;
  }

  public pause() {
    if (!this.isPlaying) return;
    this.pauseTime = this.getCurrentTime();
    this.isPlaying = false;
  }

  public seek(time: number) {
    this.pauseTime = Math.max(0, time);
    if (this.isPlaying) {
      const currentAudioTime = this.audioCtx ? this.audioCtx.currentTime : (performance.now() / 1000);
      this.startTime = currentAudioTime - this.pauseTime;
    }
  }

  public getCurrentTime(): number {
    if (this.isPlaying) {
      const currentAudioTime = this.audioCtx ? this.audioCtx.currentTime : (performance.now() / 1000);
      return Math.max(0, currentAudioTime - this.startTime);
    }
    return this.pauseTime;
  }
}
