import { useState } from 'react';
import { extractPages } from '../../../lib/pdf/operations';
import { baseName } from '../../../lib/utils/format';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { Field, PrimaryButton, inputClass } from '../shared/atoms';
import { useRunner } from '../shared/useRunner';
import { useSinglePdf } from '../shared/useSinglePdf';
import { fill, pdfBlob, pdfHint, type WorkspaceProps } from './common';

export default function ExtractTool({ lang, ui }: WorkspaceProps) {
  const runner = useRunner(ui);
  const { files, file, pages } = useSinglePdf(ui, runner);
  const [ranges, setRanges] = useState('');

  const extract = () => {
    if (!file) return;
    runner.run(async (report) => {
      const bytes = await extractPages(file, ranges, report);
      return { files: [{ name: `${baseName(file.name)}-extracted.pdf`, blob: pdfBlob(bytes) }] };
    });
  };

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} onReset={files.clear}>
      {!file ? (
        <DropZone id="extract-input" ui={ui} multiple={false} accept=".pdf,application/pdf" hint={pdfHint(ui)} onFiles={files.add} />
      ) : (
        <>
          <FileList ui={ui} lang={lang} items={files.items} reorderable={false} onMove={files.move} onRemove={files.remove} />
          {pages !== null ? <p className="text-sm text-slate-600">{fill(ui.common.pages, { n: pages })}</p> : null}
          <Field label={ui.extract.pagesLabel} htmlFor="extract-pages" help={ui.extract.pagesHelp}>
            <input id="extract-pages" className={inputClass} value={ranges} onChange={(e) => setRanges(e.target.value)} placeholder="1-3, 5, 8-" autoComplete="off" />
          </Field>
          <PrimaryButton disabled={pages === null || ranges.trim() === '' || runner.status === 'running'} onClick={extract}>{ui.extract.button}</PrimaryButton>
        </>
      )}
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
    </ToolFrame>
  );
}
