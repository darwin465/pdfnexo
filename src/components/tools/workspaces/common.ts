import type { Ui } from '../../../i18n/ui.types';
import { LIMITS } from '../../../lib/validation/files';
import { toBlob } from '../../../lib/utils/format';

export interface WorkspaceProps {
  lang: string;
  ui: Ui;
}

export const pdfHint = (ui: Ui) => ui.drop.hintPdf.replace('{max}', String(LIMITS.pdfMaxBytes / 1024 / 1024));
export const imageHint = (ui: Ui) => ui.drop.hintImages.replace('{max}', String(LIMITS.imageMaxBytes / 1024 / 1024));
export const pdfBlob = (bytes: Uint8Array): Blob => toBlob(bytes, 'application/pdf');
export const fill = (template: string, values: Record<string, string | number>): string =>
  Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, String(value)), template);
