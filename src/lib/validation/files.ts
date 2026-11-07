import { ToolError } from '../errors';

export type FileKind = 'pdf' | 'image';

export const LIMITS = {
  pdfMaxBytes: 100 * 1024 * 1024,
  imageMaxBytes: 25 * 1024 * 1024,
  maxPdfFiles: 30,
  maxImageFiles: 60,
  maxPagesRaster: 150,
} as const;

const EXTENSIONS: Record<FileKind, string[]> = { pdf: ['pdf'], image: ['jpg', 'jpeg', 'png'] };
const MIME_TYPES: Record<FileKind, string[]> = {
  pdf: ['application/pdf', 'application/x-pdf'],
  image: ['image/jpeg', 'image/png'],
};

export type ImageType = 'jpeg' | 'png';

export const detectImageType = (head: Uint8Array): ImageType | null => {
  if (head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff) return 'jpeg';
  if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) return 'png';
  return null;
};

const hasPdfHeader = (head: Uint8Array): boolean => {
  const needle = [0x25, 0x50, 0x44, 0x46, 0x2d]; // %PDF-
  for (let i = 0; i + needle.length <= head.length; i++) {
    if (needle.every((b, k) => head[i + k] === b)) return true;
  }
  return false;
};

/** Valida extensión, MIME, tamaño y firma real del archivo. Devuelve null si es válido. */
export async function validateFile(file: File, kind: FileKind): Promise<ToolError | null> {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!EXTENSIONS[kind].includes(extension)) return new ToolError('type');
  if (file.type && !MIME_TYPES[kind].includes(file.type)) return new ToolError('type');
  if (file.size === 0) return new ToolError('empty');
  const max = kind === 'pdf' ? LIMITS.pdfMaxBytes : LIMITS.imageMaxBytes;
  if (file.size > max) return new ToolError('size');

  const head = new Uint8Array(await file.slice(0, 1024).arrayBuffer());
  const ok = kind === 'pdf' ? hasPdfHeader(head) : detectImageType(head) !== null;
  return ok ? null : new ToolError('signature');
}
