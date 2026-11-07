import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { ToolError } from '../errors';
import { readBytes } from './core';

const MAX_PIXELS = 20_000_000;

/** Carga PDF.js y su worker solo cuando una herramienta lo necesita. */
export async function loadPdfJs() {
  const pdfjs = await import('pdfjs-dist');
  const worker = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjs.GlobalWorkerOptions.workerSrc = worker;
  return pdfjs;
}

export async function openWithPdfJs(file: File): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfJs();
  const data = await readBytes(file);
  try {
    return await pdfjs.getDocument({ data }).promise;
  } catch (error) {
    const name = (error as { name?: string } | null)?.name;
    if (name === 'PasswordException') throw new ToolError('encrypted');
    throw new ToolError('corrupt');
  }
}

export async function renderPage(page: PDFPageProxy, scale: number, mime: 'image/jpeg' | 'image/png', quality: number): Promise<Blob> {
  const base = page.getViewport({ scale: 1 });
  const safeScale = Math.min(scale, Math.sqrt(MAX_PIXELS / (base.width * base.height)));
  const viewport = page.getViewport({ scale: safeScale });

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.ceil(viewport.width));
  canvas.height = Math.max(1, Math.ceil(viewport.height));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new ToolError('memory');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  try {
    await page.render({ canvasContext: ctx, viewport }).promise;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, quality));
    if (!blob) throw new ToolError('memory');
    return blob;
  } finally {
    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
  }
}
