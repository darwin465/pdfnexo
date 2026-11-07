import { getDict, toolPath, type Lang } from '../i18n';
import { tools } from '../data/tools';
import type { ToolView } from '../components/tools/ToolCard';

/** Datos serializables de las herramientas para tarjetas y buscador. */
export function getToolViews(lang: Lang, only?: (t: (typeof tools)[number]) => boolean): ToolView[] {
  const t = getDict(lang);
  return tools
    .filter((tool) => (only ? only(tool) : true))
    .map((tool) => ({
      id: tool.id,
      icon: tool.icon,
      name: t.tools[tool.id].name,
      short: t.tools[tool.id].short,
      href: toolPath(lang, tool.id),
      badge: tool.available ? undefined : t.status.soon,
    }));
}
