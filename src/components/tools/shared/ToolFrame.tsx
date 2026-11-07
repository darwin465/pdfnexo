import { useState, type ReactNode } from 'react';
import { CheckCircle2, Download, ShieldCheck } from 'lucide-react';
import type { Ui } from '../../../i18n/ui.types';
import { formatBytes } from '../../../lib/utils/format';
import { toToolError } from '../../../lib/errors';
import { zipBlobs } from '../../../lib/pdf/core';
import type { Runner } from './useRunner';
import { SecondaryButton } from './atoms';

interface Props {
  ui: Ui;
  lang: string;
  runner: Runner;
  /** Se muestra mientras no haya resultado. */
  children: ReactNode;
  /** Descarga ZIP cuando hay varios archivos. */
  zipName?: string;
  onReset?: () => void;
}

const downloadClass = 'inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800';

export default function ToolFrame({ ui, lang, runner, children, zipName = 'pdfnexo.zip', onReset }: Props) {
  const [zipError, setZipError] = useState<string | null>(null);
  const { status, progress, error, outputs, notice, summary } = runner;

  const reset = () => {
    runner.reset();
    onReset?.();
  };

  const downloadZip = async () => {
    try {
      setZipError(null);
      const blob = await zipBlobs(outputs.map(({ name, blob }) => ({ name, blob })));
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = zipName;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (e) {
      setZipError(ui.errors[toToolError(e).code]);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-card sm:p-6">
      {status === 'done' ? (
        <div role="status" className="space-y-5">
          {outputs.length > 0 ? (
            <>
              <div className="flex items-center gap-2 text-lg font-semibold text-brand-900">
                <CheckCircle2 className="text-emerald-600" size={22} aria-hidden="true" />
                {outputs.length > 1 ? ui.common.filesReady.replace('{n}', String(outputs.length)) : ui.common.ready}
              </div>
              {summary ? <p className="text-sm text-slate-700">{summary}</p> : null}
              <ul className="space-y-2">
                {outputs.map((file) => (
                  <li key={file.url} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-900">{file.name}</span>
                      <span className="block text-xs text-slate-500">{formatBytes(file.blob.size, lang)}</span>
                    </span>
                    <a href={file.url} download={file.name} className={downloadClass}>
                      <Download size={16} aria-hidden="true" />
                      {ui.actions.download}
                    </a>
                  </li>
                ))}
              </ul>
              {outputs.length > 1 ? (
                <button type="button" onClick={downloadZip} className={downloadClass}>
                  <Download size={16} aria-hidden="true" />
                  {ui.actions.downloadAll}
                </button>
              ) : null}
              {zipError ? <p className="text-sm text-red-700" role="alert">{zipError}</p> : null}
            </>
          ) : (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{notice}</p>
          )}
          <SecondaryButton onClick={reset}>{ui.actions.reset}</SecondaryButton>
        </div>
      ) : (
        <div className="space-y-5">
          {children}
          {status === 'running' ? (
            <div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label={ui.common.processing.replace('{p}', String(progress))}
                className="h-2.5 overflow-hidden rounded-full bg-slate-200"
              >
                <div className="h-full rounded-full bg-brand-600 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-600" aria-live="polite">{ui.common.processing.replace('{p}', String(progress))}</p>
            </div>
          ) : null}
          {error ? (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-semibold">{ui.common.errorTitle}</p>
              <p className="mt-1">{error}</p>
            </div>
          ) : null}
        </div>
      )}
      <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck size={14} aria-hidden="true" />
        {ui.common.local}
      </p>
    </div>
  );
}
