export const languages = ['es', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'en';

export const toolsBase: Record<Lang, string> = { es: 'herramientas', en: 'tools' };
export const htmlLocale: Record<Lang, string> = { es: 'es_ES', en: 'en_US' };
