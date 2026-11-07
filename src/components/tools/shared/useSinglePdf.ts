import { useEffect, useState } from 'react';
import { toToolError } from '../../../lib/errors';
import { countPages } from '../../../lib/pdf/core';
import type { Ui } from '../../../i18n/ui.types';
import { useFiles } from './useFiles';
import type { Runner } from './useRunner';

/** Un único PDF validado y su número de páginas. */
export function useSinglePdf(ui: Ui, runner: Runner, readPages = true) {
  const files = useFiles('pdf', false, 1, ui);
  const [pages, setPages] = useState<number | null>(null);
  const file = files.items[0]?.file;

  useEffect(() => {
    setPages(null);
    if (!file || !readPages) return;
    let cancelled = false;
    countPages(file)
      .then((n) => { if (!cancelled) setPages(n); })
      .catch((e) => {
        if (cancelled) return;
        runner.setError(ui.errors[toToolError(e).code]);
        files.clear();
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return { files, file, pages };
}
