import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

let ffmpeg: FFmpeg | null = null;

export const loadFfmpeg = async () => {
  if (ffmpeg) return ffmpeg;
  
  ffmpeg = new FFmpeg();
  
  // Load ffmpeg from unpkg for ease of setup
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  
  return ffmpeg;
};

// helper function to load blob URLs
const toBlobURL = async (url: string, type: string) => {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const blob = new Blob([buf], { type });
  return URL.createObjectURL(blob);
};

export const compressVideo = async (file: File): Promise<Blob> => {
  const ff = await loadFfmpeg();
  
  await ff.writeFile("input.mp4", await fetchFile(file));
  // Simple compression: lower bitrate, 720p
  await ff.exec(["-i", "input.mp4", "-vcodec", "libx264", "-crf", "28", "output.mp4"]);
  
  const data = await ff.readFile("output.mp4");
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
  return new Blob([bytes], { type: "video/mp4" });
};

export const extractAudio = async (file: File): Promise<Blob> => {
  const ff = await loadFfmpeg();
  
  await ff.writeFile("input.mp4", await fetchFile(file));
  await ff.exec(["-i", "input.mp4", "-q:a", "0", "-map", "a", "output.mp3"]);
  
  const data = await ff.readFile("output.mp3");
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
  return new Blob([bytes], { type: "audio/mpeg" });
};
