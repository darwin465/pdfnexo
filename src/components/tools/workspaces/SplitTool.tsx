import { useEffect, useState } from 'react';
import { LIMITS } from '../../../lib/validation/files';
import { toToolError } from '../../../lib/errors';
import { countPages } from '../../../lib/pdf/core';
import { splitPdf, type SplitPlan } from '../../../lib/pdf/operations';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { Choice, Field, PrimaryButton, inputClass } from '../shared/atoms';
import { useFiles } from '../shared/useFiles';
import { useRunner } from '../shared/useRunner';
import { fill, pdfBlob, pdfHint, type WorkspaceProps } from './common';
import { baseName } from '../../../lib/utils/format';

type Mode = 'ranges' | 'each' | 'every';

export default function SplitTool({ lang, ui }: WorkspaceProps) {
  const files = useFiles('pdf', false, 1, ui);
  const runner = useRunner(ui);
  const [pages, setPages] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>('ranges');
  const [ranges, setRanges] = useState('');
  const [every, setEvery] = useState(1);
  const file = files.items[0]?.file;

  useEffect(() => {
    setPages(null);
    if (!file) return;
    let cancelled = false;
    countPages(file)
      .then((n) => { if (!cancelled) setPages(n); })
      .catch((e) => { if (!cancelled) { runner.setError(ui.errors[toToolError(e).code]); files.clear(); } });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const split = () => {
    if (!file) return;
    const plan: SplitPlan = mode === 'ranges' ? { mode, ranges } : mode === 'every' ? { mode, every } : { mode };
    runner.run(async (report) => {
      const outputs = await splitPdf(file, plan, report);
      return { files: outputs.map((o) => ({ name: o.name, blob: pdfBlob(o.bytes) })) };
    });
  };

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} zipName={`${file ? baseName(file.name) : 'split'}.zip`} onReset={files.clear}>
      {!file ? (
        <DropZone id="split-input" ui={ui} multiple={false} accept=".pdf,application/pdf" hint={pdfHint(ui)} onFiles={files.add} />
      ) : (
        <>
          <FileList ui={ui} lang={lang} items={files.items} reorderable={false} onMove={files.move} onRemove={files.remove} />
          {pages !== null ? <p className="text-sm text-slate-600">{fill(ui.common.pages, { n: pages })}</p> : null}
          <Choice<Mode>
            name="split-mode" legend={ui.split.mode} value={mode} onChange={setMode}
            options={[
              { value: 'ranges', label: ui.split.modeRanges },
              { value: 'each', label: ui.split.modeEach },
              { value: 'every', label: ui.split.modeEvery },
            ]}
          />
          {mode === 'ranges' ? (
            <Field label={ui.split.rangesLabel} htmlFor="split-ranges" help={ui.split.rangesHelp}>
              <input id="split-ranges" className={inputClass} value={ranges} onChange={(e) => setRanges(e.target.value)} placeholder="1-3, 5, 8-" inputMode="text" autoComplete="off" />
            </Field>
          ) : null}
          {mode === 'every' ? (
            <Field label={ui.split.everyLabel} htmlFor="split-every">
              <input id="split-every" type="number" min={1} max={pages ?? undefined} className={inputClass} value={every} onChange={(e) => setEvery(Number(e.target.value))} />
            </Field>
          ) : null}
          <PrimaryButton disabled={pages === null || runner.status === 'running'} onClick={split}>{ui.split.button}</PrimaryButton>
        </>
      )}
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
    </ToolFrame>
  );
}
