import type { Ui } from './ui.types';

export const uiEn: Ui = {
  drop: {
    dragHere: 'Drag your files here', dropNow: 'Drop to add', or: 'or',
    chooseFiles: 'Select files', chooseFile: 'Select file',
    hintPdf: 'PDF files · max {max} MB each', hintImages: 'JPG or PNG · max {max} MB each',
  },
  actions: {
    remove: 'Remove', moveUp: 'Move up', moveDown: 'Move down', moveLeft: 'Move left', moveRight: 'Move right',
    reset: 'Start over', download: 'Download', downloadAll: 'Download all (ZIP)', rotate: 'Rotate', deletePage: 'Delete page',
  },
  common: {
    pages: '{n} pages', processing: 'Processing… {p}%', ready: 'Done!', filesReady: '{n} files ready to download',
    local: 'Your file is processed on your device and is not uploaded to any server.', fileList: 'Selected files',
    errorTitle: 'The operation could not be completed', invalidFile: 'Invalid file',
  },
  errors: {
    type: 'This file type is not supported.', size: 'The file exceeds the maximum allowed size.', empty: 'The file is empty.',
    signature: 'The content is not a valid file of this type.',
    encrypted: 'This PDF is password-protected. Remove the protection before using it here.',
    corrupt: 'The file could not be read. It may be damaged.',
    'range-empty': 'Enter a value to continue.', 'range-invalid': 'The page range is not valid. Example: 1-3, 5, 8-',
    charset: 'The text contains unsupported characters. Use Latin letters, numbers and common symbols.',
    memory: 'Not enough memory to process this file. Try a smaller one.',
    tooMany: 'The result would contain too many files or pages to process in the browser.',
    noFiles: 'Select at least one file.', minFiles: 'You need at least two files.',
    engine: 'The required engine could not be loaded. Reload the page and try again.',
    unknown: 'An unexpected error occurred. Please try again.',
  },
  merge: { hint: 'Add at least 2 PDFs and reorder them with the arrows.', button: 'Merge PDF' },
  split: {
    mode: 'How to split', modeRanges: 'By ranges', modeEach: 'One page per file', modeEvery: 'Every N pages',
    rangesLabel: 'Page ranges', rangesHelp: 'Each comma-separated range creates a file. Example: 1-3, 5, 8-',
    everyLabel: 'Pages per file', button: 'Split PDF',
  },
  rotate: {
    angle: 'Rotation', a90: '90° clockwise', a180: '180°', a270: '90° counterclockwise', applyTo: 'Apply to',
    all: 'All pages', selected: 'Specific pages', pagesLabel: 'Pages', pagesHelp: 'Example: 1-3, 5', button: 'Rotate PDF',
  },
  jpg: { pageSize: 'Page size', fit: 'Same as the image', a4: 'A4 with margin', button: 'Create PDF', hint: 'Add JPG or PNG images and reorder them with the arrows.' },
  pdf2jpg: {
    quality: 'JPG quality', dpi: 'Resolution', low: '72 DPI (screen)', medium: '150 DPI (recommended)', high: '200 DPI (high)',
    pagesLabel: 'Pages (optional)', pagesHelp: 'Empty = all. Example: 1-3, 5', button: 'Convert to JPG',
  },
  extract: { pagesLabel: 'Pages to extract', pagesHelp: 'They are saved in the order given. Example: 1-3, 5, 8-', button: 'Extract pages' },
  watermark: {
    text: 'Watermark text', placeholder: 'E.g. CONFIDENTIAL', size: 'Size', opacity: 'Opacity', color: 'Color',
    gray: 'Gray', red: 'Red', blue: 'Blue', black: 'Black', position: 'Orientation', diagonal: 'Diagonal', horizontal: 'Horizontal', button: 'Add watermark',
  },
  organize: {
    hint: 'Move, rotate or delete pages. The result follows this order.', kept: '{n} pages in the result',
    button: 'Save PDF', noThumbs: 'This PDF has many pages: they are shown without thumbnails.', page: 'Page {n}',
  },
  compress: {
    mode: 'Method', light: 'Optimize structure', lightHelp: 'No quality loss. Savings are usually small or none.',
    strong: 'Strong compression', strongHelp: 'Turns pages into images: greatly reduces size, but text is no longer selectable.',
    level: 'Level', low: 'Smallest size', medium: 'Balanced', high: 'Best quality', button: 'Compress PDF',
    before: 'Original', after: 'Result', saved: 'Reduction: {p}%',
    noReduction: 'This method could not reduce the file size, so no download is offered. Try another level or method.',
  },
  protect: {
    password: 'Password', confirm: 'Repeat password', show: 'Show password', mismatch: 'Passwords do not match.',
    tooShort: 'Use at least 6 characters.', note: 'AES-256 encryption. If you forget the password the document cannot be recovered.', button: 'Protect PDF',
  },
};
