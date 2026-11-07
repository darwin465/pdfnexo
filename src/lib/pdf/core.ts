import type { PDFDocument } from 'pdf-lib';
import { ToolError } from '../errors';

export const readBytes = async (file: File): Promise<Uint8Array> => new Uint8Array(await file.arrayBuffer());

/** Abre un PDF con pdf-lib (carga diferida). Traduce los fallos a errores controlados. */
export async function openPdf(bytes: Uint8Array): Promise<PDFDocument> {
  const { PDFDocument, EncryptedPDFError } = await import('pdf-lib');
  try {
    return await PDFDocument.load(bytes, { updateMetadata: false });
  } catch (error) {
    if (error instanceof EncryptedPDFError) throw new ToolError('encrypted');
    throw new ToolError('corrupt');
  }
}

export async function countPages(file: File): Promise<number> {
  const doc = await openPdf(await readBytes(file));
  return doc.getPageCount();
}

export async function extractToDocument(source: PDFDocument, indices: number[]): Promise<PDFDocument> {
  const { PDFDocument } = await import('pdf-lib');
  const out = await PDFDocument.create();
  const pages = await out.copyPages(source, indices);
  pages.forEach((page) => out.addPage(page));
  return out;
}

export interface NamedBytes {
  name: string;
  bytes: Uint8Array;
}

export interface NamedBlob {
  name: string;
  blob: Blob;
}

export async function zipBlobs(items: NamedBlob[]): Promise<Blob> {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const used = new Set<string>();
  for (const item of items) {
    let name = item.name;
    let n = 1;
    while (used.has(name)) name = item.name.replace(/(\.[^.]+)?$/, `-${n++}$1`);
    used.add(name);
    zip.file(name, item.blob);
  }
  return zip.generateAsync({ type: 'blob', compression: 'STORE' });
}
