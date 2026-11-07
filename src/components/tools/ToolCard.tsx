import Icon, { type IconName } from '../common/Icon';

export interface ToolView {
  id: string;
  icon: IconName;
  name: string;
  short: string;
  href: string;
  badge?: string;
}

export default function ToolCard({ tool }: { tool: ToolView }) {
  return (
    <a
      href={tool.href}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white">
        <Icon name={tool.icon} size={22} strokeWidth={1.75} />
      </span>
      <span className="flex flex-wrap items-center gap-2">
        <span className="text-base font-semibold text-slate-900">{tool.name}</span>
        {tool.badge ? (
          <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-medium text-accent-600">{tool.badge}</span>
        ) : null}
      </span>
      <span className="text-sm leading-relaxed text-slate-600">{tool.short}</span>
    </a>
  );
}
