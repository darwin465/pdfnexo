import { ToolError } from '../errors';
import { detectImageType } from '../validation/files';
import { readBytes } from './core';

export type PageSizeMode = 'fit' | 'a4';

/** Lee la orientación EXIF (1–8) de un JPEG. Devuelve 1 si no hay dato. */
export function getJpegOrientation(bytes: Uint8Array): number {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) return 1;
  let offset = 2;
  while (offset + 4 <= view.byteLength) {
    const marker = view.getUint16(offset);
    if ((marker & 0xff00) !== 0xff00) return 1;
    const length = view.getUint16(offset + 2);
    if (marker === 0xffe1 && view.getUint32(offset + 4) === 0x45786966) {
      const tiff = offset + 10;
      if (tiff + 8 > view.byteLength) return 1;
      const little = view.getUint16(tiff) === 0x4949;
      const ifd = tiff + view.getUint32(tiff + 4, little);
      if (ifd + 2 > view.byteLength) return 1;
      const entries = view.getUint16(ifd, little);
      for (let i = 0; i < entries; i++) {
        const entry = ifd + 2 + i * 12;
        if (entry + 12 > view.byteLength) return 1;
        if (view.getUint16(entry, little) === 0x0112) {
          const value = view.getUint16(entry + 8, little);
          return value >= 1 && value <= 8 ? value : 1;
        }
      }
      return 1;
    }
    offset += 2 + length;
  }
  return 1;
}

/** Re-dibuja el JPEG aplicando su orientación EXIF para que el PDF se vea derecho. */
async function normalizeJpeg(file: File): Promise<Uint8Array> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new ToolError('memory');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95));
  canvas.width = 0;
  canvas.height = 0;
  if (!blob) throw new ToolError('memory');
  return new Uint8Array(await blob.arrayBuffer());
}

const A4 = { w: 595.28, h: 841.89, margin: 24 };

export async function imagesToPdf(
  files: File[],
  mode: PageSizeMode,
  onProgress: (percent: number) => void,
): Promise<Uint8Array> {
  if (files.length === 0) throw new ToolError('noFiles');
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.create();

  for (const [i, file] of files.entries()) {
    let bytes = await readBytes(file);
    const type = detectImageType(bytes);
    if (!type) throw new ToolError('signature');

    let image;
    try {
      if (type === 'jpeg') {
        if (getJpegOrientation(bytes) !== 1) bytes = await normalizeJpeg(file);
        image = await doc.embedJpg(bytes);
      } else {
        image = await doc.embedPng(bytes);
      }
    } catch (error) {
      if (error instanceof ToolError) throw error;
      throw new ToolError('corrupt');
    }

    if (mode === 'fit') {
      const page = doc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    } else {
      const landscape = image.width > image.height;
      const pageW = landscape ? A4.h : A4.w;
      const pageH = landscape ? A4.w : A4.h;
      const scale = Math.min((pageW - A4.margin * 2) / image.width, (pageH - A4.margin * 2) / image.height, 1);
      const w = image.width * scale;
      const h = image.height * scale;
      const page = doc.addPage([pageW, pageH]);
      page.drawImage(image, { x: (pageW - w) / 2, y: (pageH - h) / 2, width: w, height: h });
    }
    onProgress(Math.round(((i + 1) / files.length) * 95));
  }
  return doc.save();
}
