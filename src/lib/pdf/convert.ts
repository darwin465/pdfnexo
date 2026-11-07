import { ToolError } from '../errors';
import { baseName } from '../utils/format';
import { LIMITS } from '../validation/files';
import type { NamedBlob } from './core';
import { parsePageRanges, flattenRanges } from './ranges';
import { openWithPdfJs, renderPage } from './render';

type Progress = (percent: number) => void;

export interface PdfToJpgPlan {
  dpi: 72 | 150 | 200;
  quality: number;
  /** Vacío = todas las páginas. */
  ranges: string;
}

export async function pdfToJpg(file: File, plan: PdfToJpgPlan, onProgress: Progress): Promise<NamedBlob[]> {
  const doc = await openWithPdfJs(file);
  try {
    const total = doc.numPages;
    const pages = plan.ranges.trim() === ''
      ? Array.from({ length: total }, (_, i) => i)
      : flattenRanges(parsePageRanges(plan.ranges, total));
    if (pages.length > LIMITS.maxPagesRaster) throw new ToolError('tooMany');

    const base = baseName(file.name);
    const outputs: NamedBlob[] = [];
    for (const [i, index] of pages.entries()) {
      const page = await doc.getPage(index + 1);
      const blob = await renderPage(page, plan.dpi / 72, 'image/jpeg', plan.quality);
      outputs.push({ name: `${base}-page-${index + 1}.jpg`, blob });
      onProgress(Math.round(((i + 1) / pages.length) * 100));
    }
    return outputs;
  } finally {
    await doc.destroy();
  }
}

export interface CompressStrongPlan {
  dpi: 72 | 110 | 150;
  quality: number;
}

/** Compresión real por re-rasterizado: el texto deja de ser seleccionable. */
export async function compressStrong(file: File, plan: CompressStrongPlan, onProgress: Progress): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const doc = await openWithPdfJs(file);
  try {
    if (doc.numPages > LIMITS.maxPagesRaster) throw new ToolError('tooMany');
    const out = await PDFDocument.create();
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const size = page.getViewport({ scale: 1 });
      const blob = await renderPage(page, plan.dpi / 72, 'image/jpeg', plan.quality);
      const image = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      const target = out.addPage([size.width, size.height]);
      target.drawImage(image, { x: 0, y: 0, width: size.width, height: size.height });
      onProgress(Math.round((i / doc.numPages) * 95));
    }
    return out.save();
  } finally {
    await doc.destroy();
  }
}
