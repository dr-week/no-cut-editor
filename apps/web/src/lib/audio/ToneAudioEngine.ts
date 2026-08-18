/**
 * @file ToneAudioEngine.ts
 * @description Multi-track audio playback engine using Tone.js Transport.
 * Replaces the silent EngineClock audio graph with real speaker output,
 * volume mixing, and hardware-synced DAC scheduling.
 * @module apps/web/src/lib/audio/ToneAudioEngine
 */

import * as Tone from "tone";
import type { TrackClip } from "../store/editorStore";

export class ToneAudioEngine {
  private static instance: ToneAudioEngine;
  private players = new Map<string, Tone.Player>();
  private gainNodes = new Map<string, Tone.Gain>();
  private masterGain: Tone.Gain;

  private constructor() {
    this.masterGain = new Tone.Gain(0.85).toDestination();
  }

  public static getInstance(): ToneAudioEngine {
    if (!ToneAudioEngine.instance) {
      ToneAudioEngine.instance = new ToneAudioEngine();
    }
    return ToneAudioEngine.instance;
  }

  /**
   * Loads an audio clip URL into Tone.Player and schedules it on the transport.
   */
  public async loadClip(clip: TrackClip, url: string, volume = 0.8): Promise<void> {
    if (this.players.has(clip.id)) return;

    await Tone.start(); // Resume AudioContext on user gesture

    const gain = new Tone.Gain(volume).connect(this.masterGain);
    const player = new Tone.Player({
      url,
      onload: () => {
        Tone.getTransport().schedule((time) => {
          player.start(time, clip.startTime, clip.duration);
        }, clip.startTime);
      },
    }).connect(gain);

    this.players.set(clip.id, player);
    this.gainNodes.set(clip.id, gain);
  }

  public play(startTime = 0) {
    Tone.getTransport().seconds = startTime;
    Tone.getTransport().start();
  }

  public pause() {
    Tone.getTransport().pause();
  }

  public seek(time: number) {
    Tone.getTransport().seconds = time;
  }

  public setVolume(clipId: string, volume: number) {
    const gain = this.gainNodes.get(clipId);
    if (gain) gain.gain.rampTo(volume, 0.05);
  }

  public mute(clipId: string) {
    this.setVolume(clipId, 0);
  }

  public unmute(clipId: string) {
    this.setVolume(clipId, 0.8);
  }

  public getCurrentTime(): number {
    return Tone.getTransport().seconds;
  }

  public unloadClip(clipId: string) {
    const player = this.players.get(clipId);
    const gain = this.gainNodes.get(clipId);
    player?.stop();
    player?.dispose();
    gain?.dispose();
    this.players.delete(clipId);
    this.gainNodes.delete(clipId);
  }

  public destroy() {
    this.players.forEach((p) => { p.stop(); p.dispose(); });
    this.gainNodes.forEach((g) => g.dispose());
    this.masterGain.dispose();
    this.players.clear();
    this.gainNodes.clear();
  }
}
