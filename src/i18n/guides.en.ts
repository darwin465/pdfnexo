import type { GuidesDict } from './guides.types';

export const guidesEn: GuidesDict = {
  base: 'guides',
  sectionTitle: 'Guides and tips',
  sectionSubtitle: 'Clear answers to the most common PDF problems.',
  read: 'Read guide',
  breadcrumb: 'Guides',
  tryTool: 'Try the tool',
  guides: {
    'merge-guide': {
      slug: 'how-to-merge-pdf-files',
      title: 'How to Merge PDF Files Step by Step',
      description: 'Learn how to combine several PDFs into one document, order the pages properly and avoid the most common problems.',
      intro: 'Merging PDFs is handy for sending a complete file, handing in an assignment or archiving invoices. Here are the steps and checks that prevent surprises.',
      tool: 'merge',
      sections: [
        { h: 'Before you start', p: ['Gather your files and check that none is password-protected: encrypted documents can’t be combined until the protection is removed.', 'Name them so the order is easy to remember, for example “01-cover”, “02-contract”. You can reorder them later, but it saves time.'] },
        { h: 'Putting documents in order', p: ['The order of the list is the order of the result: the first file provides the first pages. Use the arrows to move each document up or down until the sequence is right.'] },
        { h: 'Checking the result', p: ['Open the final PDF and scroll through the pages. Make sure none is missing and the orientation is what you expect. If a page comes out rotated, you can fix it afterwards with the rotate tool.'] },
        { h: 'When the file is too large', p: ['If the merged document is too big to email, try compressing it. Keep in mind that strong compression turns pages into images and text is no longer selectable.'] },
      ],
    },
    'reduce-size-guide': {
      slug: 'how-to-reduce-pdf-size',
      title: 'How to Reduce PDF File Size Without Surprises',
      description: 'Why some PDFs are so large, what options exist to shrink them and what you give up with each one.',
      intro: 'A heavy PDF is a problem when emailing it or uploading it to a portal. Understanding where the weight comes from helps you choose how to reduce it.',
      tool: 'compress',
      sections: [
        { h: 'Where the weight comes from', p: ['In most cases, images are the cause: high-resolution scans or embedded photographs. Embedded fonts and duplicated elements add up too, but they usually weigh less.'] },
        { h: 'Optimizing without losing quality', p: ['Reorganizing the file’s internal structure doesn’t change images or text, so it is safe. The downside is that savings are usually small, and sometimes none.'] },
        { h: 'Strong compression', p: ['Turning each page into a lower-resolution image greatly reduces the size of image-heavy documents. In exchange, text is no longer selectable or searchable. Pick the level for the use: screen, email or print.'] },
        { h: 'What to expect', p: ['There is no guaranteed percentage: it depends on the content. A good habit is to compare the size before and after, and keep the original in case you need more quality.'] },
      ],
    },
  },
};
