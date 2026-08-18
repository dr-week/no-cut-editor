/**
 * @file EditorEngine.ts
 * @description Decoupled Sub-16ms Playback Engine.
 * Uses Tone.js Transport as the single master hardware clock — eliminates dual-clock
 * A/V drift. Wires ToneAudioEngine for real multi-track speaker output.
 * Fixes: #1 (no audio), #6 (AudioContext gesture), #8 (dual clock drift).
 * @module apps/web/src/lib/engine/EditorEngine
 */

import * as Tone from "tone";
import { ToneAudioEngine } from "../audio/ToneAudioEngine";

export class EditorEngine {
  private static instance: EditorEngine;

  public duration: number = 60;
  private _isPlaying = false;
  private animFrameId: number | null = null;
  private onTickCallbacks: ((time: number) => void)[] = [];
  private onPlayStateChangeCallbacks: ((isPlaying: boolean) => void)[] = [];

  private constructor() {
    this.requestTick();
  }

  public static getInstance(): EditorEngine {
    if (!this.instance) {
      this.instance = new EditorEngine();
    }
    return this.instance;
  }

  public get isPlaying(): boolean { return this._isPlaying; }

  // Single source of truth: Tone.Transport (AudioContext.currentTime internally)
  public get currentTime(): number {
    return Tone.getTransport().seconds;
  }

  public async play() {
    if (this._isPlaying) return;
    await Tone.start(); // Resumes AudioContext on user gesture — fixes #6
    Tone.getTransport().start();
    ToneAudioEngine.getInstance().play(this.currentTime); // Real audio — fixes #1
    this._isPlaying = true;
    this.notifyPlayStateChange();
  }

  public pause() {
    if (!this._isPlaying) return;
    Tone.getTransport().pause();
    ToneAudioEngine.getInstance().pause();
    this._isPlaying = false;
    this.notifyPlayStateChange();
  }

  public togglePlay() {
    if (this._isPlaying) this.pause();
    else this.play();
  }

  public seek(time: number) {
    const clamped = Math.max(0, Math.min(this.duration, time));
    Tone.getTransport().seconds = clamped; // Fixes #8: one clock for video + audio
    ToneAudioEngine.getInstance().seek(clamped);
    this.notifyTick();
  }

  public setDuration(duration: number) {
    this.duration = Math.max(0.1, duration);
  }

  public subscribe(cb: (time: number) => void): () => void {
    this.onTickCallbacks.push(cb);
    cb(this.currentTime);
    return () => { this.onTickCallbacks = this.onTickCallbacks.filter((c) => c !== cb); };
  }

  public subscribePlayState(cb: (isPlaying: boolean) => void): () => void {
    this.onPlayStateChangeCallbacks.push(cb);
    cb(this._isPlaying);
    return () => { this.onPlayStateChangeCallbacks = this.onPlayStateChangeCallbacks.filter((c) => c !== cb); };
  }

  private notifyTick() {
    const time = this.currentTime;
    for (let i = 0; i < this.onTickCallbacks.length; i++) this.onTickCallbacks[i](time);
  }

  private notifyPlayStateChange() {
    for (let i = 0; i < this.onPlayStateChangeCallbacks.length; i++) this.onPlayStateChangeCallbacks[i](this._isPlaying);
  }

  private requestTick() {
    const tick = () => {
      if (this._isPlaying) {
        if (this.currentTime >= this.duration) { this.seek(this.duration); this.pause(); }
        this.notifyTick();
      }
      this.animFrameId = requestAnimationFrame(tick);
    };
    if (typeof requestAnimationFrame !== "undefined") this.animFrameId = requestAnimationFrame(tick);
  }

  public destroy() {
    if (this.animFrameId !== null && typeof cancelAnimationFrame !== "undefined") cancelAnimationFrame(this.animFrameId);
    this.onTickCallbacks = [];
    this.onPlayStateChangeCallbacks = [];
  }
}
