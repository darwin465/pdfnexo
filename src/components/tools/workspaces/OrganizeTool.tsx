import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Trash2 } from 'lucide-react';
import { toToolError } from '../../../lib/errors';
import { organizePdf } from '../../../lib/pdf/operations';
import { openWithPdfJs, renderPage } from '../../../lib/pdf/render';
import { baseName } from '../../../lib/utils/format';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { PrimaryButton } from '../shared/atoms';
import { useRunner } from '../shared/useRunner';
import { useSinglePdf } from '../shared/useSinglePdf';
import { fill, pdfBlob, pdfHint, type WorkspaceProps } from './common';

const THUMB_LIMIT = 200;

interface PageItem {
  index: number;
  rotation: number;
  thumb?: string;
}

const iconButton = 'flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-40';

export default function OrganizeTool({ lang, ui }: WorkspaceProps) {
  const runner = useRunner(ui);
  // El número de páginas lo leen las miniaturas (PDF.js), no pdf-lib.
  const { files, file } = useSinglePdf(ui, runner, false);
  const [items, setItems] = useState<PageItem[]>([]);
  const [noThumbs, setNoThumbs] = useState(false);
  const urls = useRef<string[]>([]);

  const revoke = () => {
    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current = [];
  };
  useEffect(() => revoke, []);

  useEffect(() => {
    revoke();
    setItems([]);
    setNoThumbs(false);
    if (!file) return;
    let cancelled = false;
    (async () => {
      try {
        const doc = await openWithPdfJs(file);
        try {
          const total = doc.numPages;
          setItems(Array.from({ length: total }, (_, index) => ({ index, rotation: 0 })));
          if (total > THUMB_LIMIT) {
            setNoThumbs(true);
            return;
          }
          for (let n = 1; n <= total; n++) {
            if (cancelled) return;
            const page = await doc.getPage(n);
            const blob = await renderPage(page, 0.3, 'image/jpeg', 0.7);
            if (cancelled) return;
            const url = URL.createObjectURL(blob);
            urls.current.push(url);
            setItems((current) => current.map((item) => (item.index === n - 1 ? { ...item, thumb: url } : item)));
          }
        } finally {
          await doc.destroy();
        }
      } catch (e) {
        if (cancelled) return;
        runner.setError(ui.errors[toToolError(e).code]);
        files.clear();
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const move = (position: number, delta: -1 | 1) =>
    setItems((current) => {
      const target = position + delta;
      if (target < 0 || target >= current.length) return current;
      const copy = [...current];
      const [moved] = copy.splice(position, 1);
      copy.splice(target, 0, moved as PageItem);
      return copy;
    });
  const rotate = (position: number) =>
    setItems((current) => current.map((item, i) => (i === position ? { ...item, rotation: (item.rotation + 90) % 360 } : item)));
  const remove = (position: number) => setItems((current) => current.filter((_, i) => i !== position));

  const save = () => {
    if (!file) return;
    runner.run(async (report) => {
      const bytes = await organizePdf(file, items.map(({ index, rotation }) => ({ index, rotation })), report);
      return { files: [{ name: `${baseName(file.name)}-organized.pdf`, blob: pdfBlob(bytes) }] };
    });
  };

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} onReset={files.clear}>
      {!file ? (
        <DropZone id="organize-input" ui={ui} multiple={false} accept=".pdf,application/pdf" hint={pdfHint(ui)} onFiles={files.add} />
      ) : (
        <>
          <FileList ui={ui} lang={lang} items={files.items} reorderable={false} onMove={files.move} onRemove={files.remove} />
          <p className="text-sm text-slate-600">{ui.organize.hint} {items.length > 0 ? fill(ui.organize.kept, { n: items.length }) : ''}</p>
          {noThumbs ? <p className="text-sm text-amber-800">{ui.organize.noThumbs}</p> : null}
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, position) => {
              const label = fill(ui.organize.page, { n: item.index + 1 });
              return (
                <li key={item.index} className="rounded-xl border border-slate-200 bg-white p-2">
                  <div className="flex h-36 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                    {item.thumb ? (
                      <img src={item.thumb} alt={label} className="max-h-full max-w-full object-contain transition-transform" style={{ transform: `rotate(${item.rotation}deg)` }} />
                    ) : (
                      <span className="text-2xl font-semibold text-slate-400">{item.index + 1}</span>
                    )}
                  </div>
                  <p className="mt-2 text-center text-xs font-medium text-slate-600">{label}</p>
                  <div className="mt-2 flex justify-center gap-1">
                    <button type="button" className={iconButton} disabled={position === 0} onClick={() => move(position, -1)} aria-label={`${ui.actions.moveLeft}: ${label}`}><ArrowLeft size={16} aria-hidden="true" /></button>
                    <button type="button" className={iconButton} disabled={position === items.length - 1} onClick={() => move(position, 1)} aria-label={`${ui.actions.moveRight}: ${label}`}><ArrowRight size={16} aria-hidden="true" /></button>
                    <button type="button" className={iconButton} onClick={() => rotate(position)} aria-label={`${ui.actions.rotate}: ${label}`}><RotateCw size={16} aria-hidden="true" /></button>
                    <button type="button" className={iconButton} onClick={() => remove(position)} aria-label={`${ui.actions.deletePage}: ${label}`}><Trash2 size={16} aria-hidden="true" /></button>
                  </div>
                </li>
              );
            })}
          </ol>
          <PrimaryButton disabled={items.length === 0 || runner.status === 'running'} onClick={save}>{ui.organize.button}</PrimaryButton>
        </>
      )}
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
    </ToolFrame>
  );
}
