/**
 * @file FFmpegProxyEngine.ts
 * @description 720p Proxy Transcoding & Lossless Export Engine using @ffmpeg/ffmpeg.wasm.
 * Runs FFmpeg in a SharedArrayBuffer Web Worker to transcode 4K/8K files
 * into 720p editing proxies and stitch final exports locally.
 * @module apps/web/src/lib/engine/FFmpegProxyEngine
 */

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export interface ProxyTranscodeResult {
  proxyUrl: string;
  proxyBlob: Blob;
  width: number;
  height: number;
}

export class FFmpegProxyEngine {
  private static instance: FFmpegProxyEngine;
  private ffmpeg: FFmpeg;
  private loaded = false;

  private constructor() {
    this.ffmpeg = new FFmpeg();
  }

  public static getInstance(): FFmpegProxyEngine {
    if (!FFmpegProxyEngine.instance) {
      FFmpegProxyEngine.instance = new FFmpegProxyEngine();
    }
    return FFmpegProxyEngine.instance;
  }

  private async load() {
    if (this.loaded) return;
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
    this.ffmpeg.on("log", ({ message }) => {
      if (process.env.NODE_ENV === "development") console.log("[ffmpeg]", message);
    });
    await this.ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
    this.loaded = true;
  }

  /**
   * Transcodes a 4K/8K video File to a 720p editing proxy MP4.
   * Returns a local blob URL safe for `<video>` preview and WebCodecs decoding.
   */
  public async createProxy(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<ProxyTranscodeResult> {
    await this.load();

    const inputName = `input_${Date.now()}.mp4`;
    const outputName = `proxy_720p_${Date.now()}.mp4`;

    this.ffmpeg.on("progress", ({ progress }) => {
      onProgress?.(Math.round(progress * 100));
    });

    await this.ffmpeg.writeFile(inputName, await fetchFile(file));
    await this.ffmpeg.exec([
      "-i", inputName,
      "-vf", "scale=1280:720:force_original_aspect_ratio=decrease",
      "-c:v", "libx264",
      "-preset", "ultrafast",
      "-crf", "23",
      "-c:a", "aac",
      "-ar", "48000",
      outputName,
    ]);

    const data = await this.ffmpeg.readFile(outputName);
    const proxyBlob = new Blob([data], { type: "video/mp4" });
    const proxyUrl = URL.createObjectURL(proxyBlob);

    await this.ffmpeg.deleteFile(inputName);
    await this.ffmpeg.deleteFile(outputName);

    return { proxyUrl, proxyBlob, width: 1280, height: 720 };
  }

  /**
   * Exports the final rendered video from a sequence of frame blobs.
   */
  public async exportVideo(
    frameBlobs: Blob[],
    fps = 30,
    onProgress?: (percent: number) => void
  ): Promise<Blob> {
    await this.load();

    for (let i = 0; i < frameBlobs.length; i++) {
      await this.ffmpeg.writeFile(`frame_${String(i).padStart(5, "0")}.png`, await fetchFile(frameBlobs[i]));
    }

    this.ffmpeg.on("progress", ({ progress }) => onProgress?.(Math.round(progress * 100)));

    await this.ffmpeg.exec([
      "-framerate", String(fps),
      "-i", "frame_%05d.png",
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      "output.mp4",
    ]);

    const data = await this.ffmpeg.readFile("output.mp4");
    return new Blob([data], { type: "video/mp4" });
  }

  public isLoaded() {
    return this.loaded;
  }
}
