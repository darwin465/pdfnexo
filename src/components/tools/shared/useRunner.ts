import { useCallback, useEffect, useRef, useState } from 'react';
import { toToolError } from '../../../lib/errors';
import type { NamedBlob } from '../../../lib/pdf/core';
import type { Ui } from '../../../i18n/ui.types';

export interface OutputFile extends NamedBlob {
  url: string;
}

export interface TaskResult {
  files: NamedBlob[];
  /** Mensaje informativo cuando no hay nada que descargar. */
  notice?: string;
  /** Texto resumen (p. ej. reducción de tamaño). */
  summary?: string;
}

export type RunStatus = 'idle' | 'running' | 'done';

/** Gestiona estado, progreso, errores y URLs de descarga (que se revocan siempre). */
export function useRunner(ui: Ui) {
  const [status, setStatus] = useState<RunStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<OutputFile[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const urls = useRef<string[]>([]);

  const revoke = useCallback(() => {
    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current = [];
  }, []);

  useEffect(() => revoke, [revoke]);

  const reset = useCallback(() => {
    revoke();
    setOutputs([]);
    setError(null);
    setNotice(null);
    setSummary(null);
    setProgress(0);
    setStatus('idle');
  }, [revoke]);

  const run = useCallback(
    async (task: (report: (percent: number) => void) => Promise<TaskResult>) => {
      reset();
      setStatus('running');
      try {
        const result = await task(setProgress);
        const files = result.files.map((file) => {
          const url = URL.createObjectURL(file.blob);
          urls.current.push(url);
          return { ...file, url };
        });
        setOutputs(files);
        setNotice(result.notice ?? null);
        setSummary(result.summary ?? null);
        setProgress(100);
        setStatus('done');
      } catch (e) {
        setError(ui.errors[toToolError(e).code]);
        setStatus('idle');
      }
    },
    [reset, ui],
  );

  return { status, progress, error, outputs, notice, summary, run, reset, setError };
}

export type Runner = ReturnType<typeof useRunner>;
