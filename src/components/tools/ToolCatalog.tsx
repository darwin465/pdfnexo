import { useMemo, useState } from 'react';
import Icon from '../common/Icon';
import ToolCard, { type ToolView } from './ToolCard';

interface Props {
  tools: ToolView[];
  labels: { label: string; placeholder: string; none: string; count: string };
}

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export default function ToolCatalog({ tools, labels }: Props) {
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = normalize(query);
    if (!q) return tools;
    return tools.filter((t) => normalize(`${t.name} ${t.short}`).includes(q));
  }, [query, tools]);

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <label htmlFor="tool-search" className="sr-only">{labels.label}</label>
        <Icon name="search" size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          id="tool-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.placeholder}
          autoComplete="off"
          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-base text-slate-900 shadow-card placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <p className="sr-only" role="status" aria-live="polite">{labels.count.replace('{n}', String(visible.length))}</p>

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-slate-600">{labels.none}</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((tool) => (
            <li key={tool.id}><ToolCard tool={tool} /></li>
          ))}
        </ul>
      )}
    </div>
  );
}
