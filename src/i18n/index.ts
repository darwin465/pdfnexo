import { languages, defaultLang, toolsBase, htmlLocale, type Lang } from './config';
import type { Dict } from './types';
import { es } from './es';
import { en } from './en';
import { getTool, type ToolId } from '../data/tools';
import type { Ui, ToolContent } from './ui.types';
import { uiEs } from './ui.es';
import { uiEn } from './ui.en';
import { contentEs } from './content.es';
import { contentEn } from './content.en';
import type { Legal, LegalId } from './legal.types';
import type { GuidesDict } from './guides.types';
import { legalEs } from './legal.es';
import { legalEn } from './legal.en';
import { guidesEs } from './guides.es';
import { guidesEn } from './guides.en';

export { languages, defaultLang, htmlLocale };
export type { Lang, Dict, Ui, ToolContent, Legal, LegalId, GuidesDict };

const dictionaries: Record<Lang, Dict> = { es, en };

export const getDict = (lang: Lang): Dict => dictionaries[lang];
export const homePath = (lang: Lang): string => `/${lang}/`;
export const toolPath = (lang: Lang, id: ToolId): string => `/${lang}/${toolsBase[lang]}/${getTool(id).slugs[lang]}/`;
export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

const uis: Record<Lang, Ui> = { es: uiEs, en: uiEn };
const contents: Record<Lang, Record<ToolId, ToolContent>> = { es: contentEs, en: contentEn };
export const getUi = (lang: Lang): Ui => uis[lang];
export const getToolContent = (lang: Lang, id: ToolId): ToolContent => contents[lang][id];

const legals: Record<Lang, Legal> = { es: legalEs, en: legalEn };
const guides: Record<Lang, GuidesDict> = { es: guidesEs, en: guidesEn };
export const getLegal = (lang: Lang): Legal => legals[lang];
export const getGuides = (lang: Lang): GuidesDict => guides[lang];
export const legalIds: LegalId[] = ['about', 'contact', 'privacy', 'terms', 'cookies'];
export const legalPath = (lang: Lang, id: LegalId): string => `/${lang}/${legals[lang].pages[id].slug}/`;
export const guidePath = (lang: Lang, guideId: string): string => {
  const g = guides[lang];
  const guide = g.guides[guideId];
  if (!guide) throw new Error(`Unknown guide: ${guideId}`);
  return `/${lang}/${g.base}/${guide.slug}/`;
};
export const guideIds = Object.keys(guidesEs.guides);
