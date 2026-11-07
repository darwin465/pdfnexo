import type { Legal } from './legal.types';

/**
 * Informational texts. Operator data comes from PUBLIC_OPERATOR_NAME and PUBLIC_CONTACT_EMAIL.
 * They must be reviewed by a legal professional before publishing.
 */
export const legalEn: Legal = {
  donate: { button: 'Support PDFNexo', text: 'PDFNexo is free with no sign-up. If it helped you, you can help us keep it running with a voluntary donation.' },
  adLabel: 'Advertisement',
  updated: 'Last updated: November 2026',
  label: { about: 'About us', contact: 'Contact', privacy: 'Privacy policy', terms: 'Terms and conditions', cookies: 'Cookies' },
  consent: {
    title: 'Advertising and cookies',
    text: 'PDFNexo is funded by Google AdSense advertising, which may use cookies and identifiers. We will only enable them if you accept. The tools work the same if you decline.',
    accept: 'Accept', reject: 'Decline', more: 'Learn more',
  },
  cookieSettings: { button: 'Change my choice', hint: 'Clicking the button clears your current choice and reloads the page so you can be asked again.' },
  contactEmailLabel: 'Email',
  contactMissing: 'The contact email is not configured yet (PUBLIC_CONTACT_EMAIL variable).',
  operatorMissing: '[Site operator: set PUBLIC_OPERATOR_NAME]',
  pages: {
    about: {
      slug: 'about',
      title: 'About PDFNexo',
      description: 'Meet PDFNexo: free PDF tools that run in your browser, with no sign-up and built to respect your privacy.',
      sections: [
        { h: 'What PDFNexo is', p: ['PDFNexo brings together the PDF tools people need most: merge, split, compress, convert, rotate, reorganize, protect and watermark.', 'They are free, need no sign-up and work on phones, tablets and computers.'] },
        { h: 'Your files stay with you', p: ['The tools process your documents in your own browser. Files are not uploaded to our servers to be processed.'] },
        { h: 'How it is funded', p: ['The site is supported by advertising. We only show ads if you consent, and we try to keep them from getting in the way of the tools.'] },
      ],
    },
    contact: {
      slug: 'contact',
      title: 'Contact',
      description: 'Get in touch with the PDFNexo team for questions, suggestions or to exercise your privacy rights.',
      sections: [
        { h: 'Write to us', p: ['You can contact us with questions, bug reports, improvement ideas or to exercise your rights over your personal data.', 'Please do not attach private documents to your messages.'] },
      ],
    },
    privacy: {
      slug: 'privacy',
      title: 'Privacy policy',
      description: 'How PDFNexo handles your data: your files are processed in your browser and advertising only runs with your consent.',
      sections: [
        { h: 'Controller', p: ['This site is operated by {operator}. Contact: {email}.'] },
        { h: 'Your files', p: ['The PDF tools process documents locally in your browser. We do not upload, store or log the content of your files or the passwords you enter. When you close the page, the content disappears from the browser’s memory.'] },
        { h: 'Data we do process', p: ['The hosting provider may record technical data for each visit (IP address, browser, date and requested page) for security and service operation.', 'We store your advertising and cookie choice on your device using local storage.'] },
        { h: 'Advertising', p: ['If you accept, Google AdSense may use cookies and identifiers to show ads and measure their performance. The legal basis is your consent, which you can withdraw at any time from the Cookies page. See Google’s privacy policies for how Google uses data.'] },
        { h: 'Your rights', p: ['You can request access, rectification, erasure, objection, restriction or portability of your data by writing to the contact email. You may also lodge a complaint with your country’s data protection authority.'] },
        { h: 'Children', p: ['The service is not directed at children under 14.'] },
        { h: 'Changes', p: ['We may update this policy. The date of the latest revision appears at the top of the page.'] },
      ],
    },
    terms: {
      slug: 'terms',
      title: 'Terms and conditions',
      description: 'PDFNexo terms of use: permitted use, responsibility for your files and limitation of warranties.',
      sections: [
        { h: 'Acceptance', p: ['By using PDFNexo you accept these terms. If you disagree, please do not use the site.'] },
        { h: 'Permitted use', p: ['You may use the tools with documents you have the right to work with. Using the site for unlawful activities, or to try to harm or overload the service, is not allowed.'] },
        { h: 'Your documents', p: ['You are responsible for the content you process. We recommend always keeping a copy of the originals: results are generated on your device and may not suit every case.'] },
        { h: 'No warranties', p: ['The service is provided “as is”, with no guarantee of availability or that results are error-free. To the extent permitted by law, we are not liable for damages arising from use of the site.'] },
        { h: 'Intellectual property', p: ['The design, texts and code of PDFNexo belong to its owner or are used under license. Your documents remain yours.'] },
        { h: 'Changes', p: ['We may change these terms and the service. Continued use means you accept the changes.'] },
      ],
    },
    cookies: {
      slug: 'cookies',
      title: 'Cookie policy',
      description: 'Which cookies and local storage PDFNexo uses, what they are for and how to change your choice.',
      sections: [
        { h: 'Technical storage', p: ['PDFNexo stores a single preference in your browser: whether you accept or decline advertising. It needs no consent because it is required to remember your choice.'] },
        { h: 'Advertising (consent only)', p: ['If you accept, Google AdSense may set cookies or use similar identifiers to show ads and measure their effectiveness. If you decline, the advertising code is not loaded.'] },
        { h: 'How to change your choice', p: ['You can clear your choice with the button on this page. You can also delete cookies and site data from your browser settings.'] },
      ],
    },
  },
};
