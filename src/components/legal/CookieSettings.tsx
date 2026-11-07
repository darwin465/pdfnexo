export default function CookieSettings({ label, hint }: { label: string; hint: string }) {
  const reset = () => {
    try { localStorage.removeItem('pdfnexo-consent'); } catch { /* ignorado */ }
    location.reload();
  };
  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-600">{hint}</p>
      <button type="button" onClick={reset} className="mt-3 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">{label}</button>
    </div>
  );
}
