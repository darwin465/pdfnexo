import type { ToolId } from '../data/tools';

export interface ToolText {
  name: string;
  short: string;
  /** <title> SEO (≤ 60 caracteres). */
  title: string;
  description: string;
}

export interface Dict {
  siteName: string;
  tagline: string;
  meta: { homeTitle: string; homeDescription: string };
  nav: { home: string; tools: string; faq: string; menu: string; skip: string; language: string };
  hero: { title: string; subtitle: string; cta: string; popular: string };
  search: { label: string; placeholder: string; none: string; count: string };
  catalog: { title: string; subtitle: string };
  status: { soon: string };
  benefits: { title: string; items: { icon: 'gift' | 'pointer' | 'user-x' | 'shield' | 'smartphone'; title: string; text: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  footer: { tools: string; language: string; rights: string };
  toolPage: { breadcrumbHome: string; devTitle: string; devText: string; back: string; related: string };
  tools: Record<ToolId, ToolText>;
}
