import type { ToolId } from '../data/tools';
import type { ToolContent } from './ui.types';

export const contentEn: Record<ToolId, ToolContent> = {
  merge: {
    steps: ['Select or drag at least two PDF files.', 'Reorder them with the arrows until they are in the order you want.', 'Click “Merge PDF” and download the combined document.'],
    faq: [
      { q: 'How many PDFs can I merge at once?', a: 'Up to 30 files of 100 MB each. If your device runs out of memory, merge the documents in batches.' },
      { q: 'Are links and bookmarks kept?', a: 'Pages and their content are kept. Some document-level items, such as the bookmarks of the original files, may not carry over to the merged PDF.' },
      { q: 'Can I merge password-protected PDFs?', a: 'No. Remove the protection first with the tool you used to add it.' },
    ],
  },
  compress: {
    steps: ['Select a PDF.', 'Choose a method: optimize structure (lossless) or strong compression (turns pages into images).', 'Click “Compress PDF”. A download is only offered if the result is smaller than the original.'],
    faq: [
      { q: 'How much smaller will my PDF get?', a: 'It depends on the content. We can’t guarantee a percentage: the tool shows the size before and after and only offers the result if it is smaller.' },
      { q: 'What do I lose with strong compression?', a: 'Pages become images, so text can no longer be selected or searched. Use it when you only need a lightweight document to send or print.' },
      { q: 'Why does “optimize structure” barely reduce the size?', a: 'It reorganizes the file without touching images or fonts. It is safe, but savings are usually small.' },
    ],
  },
  split: {
    steps: ['Select a PDF.', 'Choose how to split it: by ranges, one page per file, or every N pages.', 'Click “Split PDF” and download the files, one by one or as a ZIP.'],
    faq: [
      { q: 'How do I write the ranges?', a: 'Separate ranges with commas. “1-3, 5, 8-” creates three files: pages 1 to 3, page 5, and page 8 to the end.' },
      { q: 'What if my PDF has many pages?', a: 'You can split it into up to 500 files. For very large results, use the ZIP download.' },
      { q: 'Is quality lost when splitting?', a: 'No. Pages are copied as they are, without recompression.' },
    ],
  },
  'jpg-to-pdf': {
    steps: ['Select or drag your JPG or PNG images.', 'Reorder them and choose the page size.', 'Click “Create PDF” and download the document.'],
    faq: [
      { q: 'Which image formats are supported?', a: 'JPG, JPEG and PNG, up to 25 MB per image.' },
      { q: 'Do phone photos come out rotated?', a: 'No. We read the photo’s orientation and correct it before creating the PDF.' },
      { q: 'Is image quality reduced?', a: 'Images are embedded without recompression. Only JPG photos that need their orientation fixed are re-encoded.' },
    ],
  },
  'pdf-to-jpg': {
    steps: ['Select a PDF.', 'Choose the resolution and, optionally, the pages to convert.', 'Click “Convert to JPG” and download the images, one by one or as a ZIP.'],
    faq: [
      { q: 'Which resolution should I pick?', a: '72 DPI is fine for screens; 150 DPI is a good balance; 200 DPI gives more detail but larger files.' },
      { q: 'Is there a page limit?', a: 'Up to 150 pages can be converted per operation to avoid exhausting the browser’s memory.' },
      { q: 'What about transparency?', a: 'JPG images don’t support transparency, so pages are drawn on a white background.' },
    ],
  },
  rotate: {
    steps: ['Select a PDF.', 'Choose the rotation and whether it applies to all pages or only some.', 'Click “Rotate PDF” and download the result.'],
    faq: [
      { q: 'Can I rotate just one page?', a: 'Yes. Choose “Specific pages” and enter the numbers, for example “3” or “2-4, 7”.' },
      { q: 'Is the rotation permanent?', a: 'It is saved in the file, so any PDF reader shows the pages with the new orientation.' },
      { q: 'Is the content recompressed?', a: 'No. Only the page orientation changes.' },
    ],
  },
  extract: {
    steps: ['Select a PDF.', 'Enter the pages you want to keep.', 'Click “Extract pages” and download the new PDF.'],
    faq: [
      { q: 'In what order do the pages end up?', a: 'In the order you type them. “5, 1-2” creates a PDF that starts with page 5.' },
      { q: 'Is my original file modified?', a: 'No. A new document is created and the original is untouched.' },
      { q: 'Is it the same as splitting?', a: 'Splitting creates several files; extracting gathers the chosen pages into a single PDF.' },
    ],
  },
  watermark: {
    steps: ['Select a PDF.', 'Type the text and adjust size, opacity, color and orientation.', 'Click “Add watermark” and download the PDF.'],
    faq: [
      { q: 'Which characters can I use?', a: 'Latin letters with accents, numbers and common symbols. Emoji and non-Latin alphabets are not supported yet.' },
      { q: 'Can it be removed later?', a: 'The mark is drawn over the page content. Always keep a copy of the original.' },
      { q: 'Is it applied to every page?', a: 'Yes, to all pages of the document.' },
    ],
  },
  organize: {
    steps: ['Select a PDF and wait for the pages to appear.', 'Move, rotate or delete pages with the buttons on each thumbnail.', 'Click “Save PDF” and download the reorganized document.'],
    faq: [
      { q: 'Can I delete pages?', a: 'Yes. Deleted pages won’t appear in the resulting PDF.' },
      { q: 'Why don’t I see thumbnails on large documents?', a: 'To protect memory, PDFs with more than 200 pages are shown without thumbnails, just their number.' },
      { q: 'Does it work on mobile?', a: 'Yes. Use the buttons on each page instead of dragging.' },
    ],
  },
  protect: {
    steps: ['Select a PDF.', 'Type a password and repeat it.', 'Click “Protect PDF” and download the encrypted document.'],
    faq: [
      { q: 'What kind of encryption is used?', a: 'Real 256-bit AES encryption, not just editing restrictions. The document can’t be opened without the password.' },
      { q: 'Can I recover the password if I forget it?', a: 'No. Keep it somewhere safe; we don’t store it.' },
      { q: 'Is my password sent to any server?', a: 'No. Encryption happens in your browser, and neither the password nor the file leaves your device.' },
    ],
  },
};
