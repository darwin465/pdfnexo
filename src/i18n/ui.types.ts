import type { ToolErrorCode } from '../lib/errors';

export interface Ui {
  drop: { dragHere: string; dropNow: string; or: string; chooseFiles: string; chooseFile: string; hintPdf: string; hintImages: string };
  actions: { remove: string; moveUp: string; moveDown: string; moveLeft: string; moveRight: string; reset: string; download: string; downloadAll: string; rotate: string; deletePage: string };
  common: { pages: string; processing: string; ready: string; filesReady: string; local: string; fileList: string; errorTitle: string; invalidFile: string };
  errors: Record<ToolErrorCode, string>;
  merge: { hint: string; button: string };
  split: { mode: string; modeRanges: string; modeEach: string; modeEvery: string; rangesLabel: string; rangesHelp: string; everyLabel: string; button: string };
  rotate: { angle: string; a90: string; a180: string; a270: string; applyTo: string; all: string; selected: string; pagesLabel: string; pagesHelp: string; button: string };
  jpg: { pageSize: string; fit: string; a4: string; button: string; hint: string };
  pdf2jpg: { quality: string; dpi: string; low: string; medium: string; high: string; pagesLabel: string; pagesHelp: string; button: string };
  extract: { pagesLabel: string; pagesHelp: string; button: string };
  watermark: { text: string; placeholder: string; size: string; opacity: string; color: string; gray: string; red: string; blue: string; black: string; position: string; diagonal: string; horizontal: string; button: string };
  organize: { hint: string; kept: string; button: string; noThumbs: string; page: string };
  compress: { mode: string; light: string; lightHelp: string; strong: string; strongHelp: string; level: string; low: string; medium: string; high: string; button: string; before: string; after: string; saved: string; noReduction: string };
  protect: { password: string; confirm: string; show: string; mismatch: string; tooShort: string; note: string; button: string };
}

export interface ToolContent {
  steps: string[];
  faq: { q: string; a: string }[];
}
