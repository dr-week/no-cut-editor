/**
 * @file EditorEngine.ts
 * @description Decoupled Sub-16ms Playback Engine with Audio-Anchored Clock Integration.
 * Drives display playheads and video frames from the hardware monotonic EngineClock.
 * @module apps/web/src/lib/engine/EditorEngine
 */

import { EngineClock } from "./EngineClock";

export class EditorEngine {
  private static instance: EditorEngine;

  public duration: number = 60;
  private clock: EngineClock;
  private animFrameId: number | null = null;

  // Callbacks for high-frequency direct DOM subscribers (Playhead, Timecode displays)
  private onTickCallbacks: ((time: number) => void)[] = [];

  // Callback for coarse UI state transitions (Play/Pause button icons)
  private onPlayStateChangeCallbacks: ((isPlaying: boolean) => void)[] = [];

  private constructor() {
    this.clock = EngineClock.getInstance();
    this.requestTick();
  }

  public static getInstance(): EditorEngine {
    if (!this.instance) {
      this.instance = new EditorEngine();
    }
    return this.instance;
  }

  public get isPlaying(): boolean {
    return this.clock.isPlaying;
  }

  public get currentTime(): number {
    return this.clock.getCurrentTime();
  }

  public play() {
    if (this.isPlaying) return;
    this.clock.play();
    this.notifyPlayStateChange();
  }

  public pause() {
    if (!this.isPlaying) return;
    this.clock.pause();
    this.notifyPlayStateChange();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seek(time: number) {
    const clamped = Math.max(0, Math.min(this.duration, time));
    this.clock.seek(clamped);
    this.notifyTick();
  }

  public setDuration(duration: number) {
    this.duration = Math.max(0.1, duration);
  }

  public subscribe(cb: (time: number) => void): () => void {
    this.onTickCallbacks.push(cb);
    cb(this.currentTime);
    return () => {
      this.onTickCallbacks = this.onTickCallbacks.filter((c) => c !== cb);
    };
  }

  public subscribePlayState(cb: (isPlaying: boolean) => void): () => void {
    this.onPlayStateChangeCallbacks.push(cb);
    cb(this.isPlaying);
    return () => {
      this.onPlayStateChangeCallbacks = this.onPlayStateChangeCallbacks.filter((c) => c !== cb);
    };
  }

  private notifyTick() {
    const time = this.currentTime;
    for (let i = 0; i < this.onTickCallbacks.length; i++) {
      this.onTickCallbacks[i](time);
    }
  }

  private notifyPlayStateChange() {
    const playing = this.isPlaying;
    for (let i = 0; i < this.onPlayStateChangeCallbacks.length; i++) {
      this.onPlayStateChangeCallbacks[i](playing);
    }
  }

  private requestTick() {
    const tick = () => {
      if (this.isPlaying) {
        const time = this.currentTime;
        if (time >= this.duration) {
          this.seek(this.duration);
          this.pause();
        }
        this.notifyTick();
      }

      this.animFrameId = requestAnimationFrame(tick);
    };

    if (typeof requestAnimationFrame !== "undefined") {
      this.animFrameId = requestAnimationFrame(tick);
    }
  }

  public destroy() {
    if (this.animFrameId !== null && typeof cancelAnimationFrame !== "undefined") {
      cancelAnimationFrame(this.animFrameId);
    }
    this.onTickCallbacks = [];
    this.onPlayStateChangeCallbacks = [];
  }
}
