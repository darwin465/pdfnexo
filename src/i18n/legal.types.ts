export type LegalId = 'about' | 'contact' | 'privacy' | 'terms' | 'cookies';

export interface LegalSection {
  h: string;
  p: string[];
}

export interface LegalPageText {
  slug: string;
  title: string;
  description: string;
  sections: LegalSection[];
}

export interface Legal {
  updated: string;
  adLabel: string;
  donate: { button: string; text: string };
  label: Record<LegalId, string>;
  consent: { title: string; text: string; accept: string; reject: string; more: string };
  cookieSettings: { button: string; hint: string };
  contactEmailLabel: string;
  contactMissing: string;
  operatorMissing: string;
  pages: Record<LegalId, LegalPageText>;
}
