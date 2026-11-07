import type { Lang } from '../i18n/config';

export const toolIds = [
  'merge', 'compress', 'split', 'jpg-to-pdf', 'pdf-to-jpg',
  'rotate', 'extract', 'watermark', 'organize', 'protect',
] as const;
export type ToolId = (typeof toolIds)[number];

export interface ToolDef {
  id: ToolId;
  slugs: Record<Lang, string>;
  icon: 'combine' | 'minimize' | 'scissors' | 'image-plus' | 'file-image' | 'rotate' | 'file-output' | 'droplets' | 'layout-grid' | 'lock';
  /** true solo cuando la herramienta está implementada y probada. */
  available: boolean;
  phase: 2 | 3;
  popular: boolean;
}

export const tools: ToolDef[] = [
  { id: 'merge', slugs: { es: 'unir-pdf', en: 'merge-pdf' }, icon: 'combine', available: true, phase: 2, popular: true },
  { id: 'compress', slugs: { es: 'comprimir-pdf', en: 'compress-pdf' }, icon: 'minimize', available: true, phase: 3, popular: true },
  { id: 'split', slugs: { es: 'dividir-pdf', en: 'split-pdf' }, icon: 'scissors', available: true, phase: 2, popular: true },
  { id: 'jpg-to-pdf', slugs: { es: 'jpg-a-pdf', en: 'jpg-to-pdf' }, icon: 'image-plus', available: true, phase: 2, popular: true },
  { id: 'pdf-to-jpg', slugs: { es: 'pdf-a-jpg', en: 'pdf-to-jpg' }, icon: 'file-image', available: true, phase: 2, popular: true },
  { id: 'rotate', slugs: { es: 'rotar-pdf', en: 'rotate-pdf' }, icon: 'rotate', available: true, phase: 2, popular: false },
  { id: 'extract', slugs: { es: 'extraer-paginas-pdf', en: 'extract-pdf-pages' }, icon: 'file-output', available: true, phase: 3, popular: false },
  { id: 'watermark', slugs: { es: 'marca-de-agua-pdf', en: 'watermark-pdf' }, icon: 'droplets', available: true, phase: 3, popular: false },
  { id: 'organize', slugs: { es: 'reorganizar-pdf', en: 'organize-pdf' }, icon: 'layout-grid', available: true, phase: 3, popular: false },
  { id: 'protect', slugs: { es: 'proteger-pdf', en: 'protect-pdf' }, icon: 'lock', available: true, phase: 3, popular: false },
];

export const getTool = (id: ToolId): ToolDef => {
  const tool = tools.find((t) => t.id === id);
  if (!tool) throw new Error(`Unknown tool: ${id}`);
  return tool;
};
