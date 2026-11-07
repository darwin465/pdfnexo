import { ToolError } from '../errors';
import { baseName } from '../utils/format';
import { openPdf, readBytes, extractToDocument, type NamedBytes } from './core';
import { chunkIndices, flattenRanges, parsePageRanges } from './ranges';

type Progress = (percent: number) => void;

export async function mergePdfs(files: File[], onProgress: Progress): Promise<Uint8Array> {
  if (files.length < 2) throw new ToolError('minFiles');
  const { PDFDocument } = await import('pdf-lib');
  const out = await PDFDocument.create();
  let done = 0;
  for (const file of files) {
    const source = await openPdf(await readBytes(file));
    const pages = await out.copyPages(source, source.getPageIndices());
    pages.forEach((page) => out.addPage(page));
    done++;
    onProgress(Math.round((done / files.length) * 100));
  }
  return out.save();
}

export type SplitPlan =
  | { mode: 'ranges'; ranges: string }
  | { mode: 'each' }
  | { mode: 'every'; every: number };

export async function splitPdf(file: File, plan: SplitPlan, onProgress: Progress): Promise<NamedBytes[]> {
  const source = await openPdf(await readBytes(file));
  const total = source.getPageCount();
  const base = baseName(file.name);

  let groups: number[][];
  if (plan.mode === 'ranges') groups = parsePageRanges(plan.ranges, total);
  else if (plan.mode === 'each') groups = chunkIndices(total, 1);
  else {
    if (!Number.isInteger(plan.every) || plan.every < 1) throw new ToolError('range-invalid');
    groups = chunkIndices(total, plan.every);
  }
  if (groups.length > 500) throw new ToolError('tooMany');

  const outputs: NamedBytes[] = [];
  for (const [i, indices] of groups.entries()) {
    const doc = await extractToDocument(source, indices);
    const first = (indices[0] ?? 0) + 1;
    const last = (indices[indices.length - 1] ?? 0) + 1;
    const label = first === last ? `page-${first}` : `pages-${first}-${last}`;
    outputs.push({ name: `${base}-${label}.pdf`, bytes: await doc.save() });
    onProgress(Math.round(((i + 1) / groups.length) * 100));
  }
  return outputs;
}

export async function extractPages(file: File, ranges: string, onProgress: Progress): Promise<Uint8Array> {
  const source = await openPdf(await readBytes(file));
  const indices = flattenRanges(parsePageRanges(ranges, source.getPageCount()));
  onProgress(40);
  const doc = await extractToDocument(source, indices);
  onProgress(80);
  return doc.save();
}

export interface RotatePlan {
  angle: 90 | 180 | 270;
  /** Vacío = todas las páginas. */
  ranges: string;
}

export async function rotatePdf(file: File, plan: RotatePlan, onProgress: Progress): Promise<Uint8Array> {
  const { degrees } = await import('pdf-lib');
  const doc = await openPdf(await readBytes(file));
  const total = doc.getPageCount();
  const targets = plan.ranges.trim() === ''
    ? doc.getPageIndices()
    : flattenRanges(parsePageRanges(plan.ranges, total));
  const pages = doc.getPages();
  for (const index of new Set(targets)) {
    const page = pages[index];
    if (!page) continue;
    page.setRotation(degrees((page.getRotation().angle + plan.angle) % 360));
  }
  onProgress(80);
  return doc.save();
}

export interface OrganizeItem {
  /** Índice de la página original (base 0). */
  index: number;
  /** Rotación adicional en grados (0, 90, 180, 270). */
  rotation: number;
}

export async function organizePdf(file: File, items: OrganizeItem[], onProgress: Progress): Promise<Uint8Array> {
  if (items.length === 0) throw new ToolError('noFiles');
  const { PDFDocument, degrees } = await import('pdf-lib');
  const source = await openPdf(await readBytes(file));
  const out = await PDFDocument.create();
  const copied = await out.copyPages(source, items.map((i) => i.index));
  copied.forEach((page, i) => {
    const extra = items[i]?.rotation ?? 0;
    if (extra) page.setRotation(degrees((page.getRotation().angle + extra) % 360));
    out.addPage(page);
  });
  onProgress(80);
  return out.save();
}

export interface WatermarkPlan {
  text: string;
  size: number;
  opacity: number;
  color: 'gray' | 'red' | 'blue' | 'black';
  position: 'diagonal' | 'horizontal';
}

const COLORS: Record<WatermarkPlan['color'], [number, number, number]> = {
  gray: [0.45, 0.45, 0.5],
  red: [0.85, 0.15, 0.15],
  blue: [0.15, 0.25, 0.8],
  black: [0, 0, 0],
};

export async function watermarkPdf(file: File, plan: WatermarkPlan, onProgress: Progress): Promise<Uint8Array> {
  const { StandardFonts, rgb, degrees } = await import('pdf-lib');
  const text = plan.text.trim();
  if (!text) throw new ToolError('range-empty');
  const doc = await openPdf(await readBytes(file));
  const font = await doc.embedFont(StandardFonts.HelveticaBold);

  let textWidth: number;
  try {
    textWidth = font.widthOfTextAtSize(text, plan.size);
  } catch {
    // La fuente estándar solo admite caracteres latinos (WinAnsi).
    throw new ToolError('charset');
  }

  const angle = plan.position === 'diagonal' ? 45 : 0;
  const rad = (angle * Math.PI) / 180;
  const halfHeight = plan.size * 0.3;
  const [r, g, b] = COLORS[plan.color];
  const pages = doc.getPages();

  pages.forEach((page, i) => {
    const { width, height } = page.getSize();
    const cx = width / 2;
    const cy = height / 2;
    const offsetX = (textWidth / 2) * Math.cos(rad) - halfHeight * Math.sin(rad);
    const offsetY = (textWidth / 2) * Math.sin(rad) + halfHeight * Math.cos(rad);
    page.drawText(text, {
      x: cx - offsetX,
      y: cy - offsetY,
      size: plan.size,
      font,
      color: rgb(r, g, b),
      opacity: plan.opacity,
      rotate: degrees(angle),
    });
    onProgress(Math.round(((i + 1) / pages.length) * 90));
  });
  return doc.save();
}

export async function compressLight(file: File, onProgress: Progress): Promise<Uint8Array> {
  const doc = await openPdf(await readBytes(file));
  onProgress(50);
  return doc.save({ useObjectStreams: true });
}
