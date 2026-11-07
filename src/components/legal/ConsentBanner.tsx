import { useEffect, useState } from 'react';

const KEY = 'pdfnexo-consent';

interface Props {
  title: string;
  text: string;
  accept: string;
  reject: string;
  more: string;
  moreHref: string;
}

/**
 * Aviso mínimo de consentimiento para publicidad. No es una CMP certificada por Google (TCF):
 * para tráfico del EEE/Reino Unido hay que integrar una CMP certificada antes de activar AdSense.
 */
export default function ConsentBanner({ title, text, accept, reject, more, moreHref }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(KEY) === null);
    } catch {
      setVisible(false);
    }
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? 'granted' : 'denied');
    } catch { /* sin almacenamiento: se ignora */ }
    window.dispatchEvent(new CustomEvent('pdfnexo:consent', { detail: { ads: granted } }));
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div role="dialog" aria-live="polite" aria-label={title} className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-card-hover sm:p-5">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">
        {text} <a href={moreHref} className="font-medium text-brand-700 underline">{more}</a>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => decide(true)} className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">{accept}</button>
        <button type="button" onClick={() => decide(false)} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">{reject}</button>
      </div>
    </div>
  );
}
