import { useState } from 'react';
import { pdfToJpg } from '../../../lib/pdf/convert';
import { baseName } from '../../../lib/utils/format';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { Choice, Field, PrimaryButton, inputClass } from '../shared/atoms';
import { useRunner } from '../shared/useRunner';
import { useSinglePdf } from '../shared/useSinglePdf';
import { fill, pdfHint, type WorkspaceProps } from './common';

type Dpi = 72 | 150 | 200;

export default function PdfToJpgTool({ lang, ui }: WorkspaceProps) {
  const runner = useRunner(ui);
  const { files, file, pages } = useSinglePdf(ui, runner);
  const [dpi, setDpi] = useState<Dpi>(150);
  const [ranges, setRanges] = useState('');

  const convert = () => {
    if (!file) return;
    runner.run(async (report) => ({ files: await pdfToJpg(file, { dpi, quality: 0.9, ranges }, report) }));
  };

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} zipName={`${file ? baseName(file.name) : 'images'}-jpg.zip`} onReset={files.clear}>
      {!file ? (
        <DropZone id="pdf2jpg-input" ui={ui} multiple={false} accept=".pdf,application/pdf" hint={pdfHint(ui)} onFiles={files.add} />
      ) : (
        <>
          <FileList ui={ui} lang={lang} items={files.items} reorderable={false} onMove={files.move} onRemove={files.remove} />
          {pages !== null ? <p className="text-sm text-slate-600">{fill(ui.common.pages, { n: pages })}</p> : null}
          <Choice<Dpi> name="pdf2jpg-dpi" legend={ui.pdf2jpg.dpi} value={dpi} onChange={setDpi}
            options={[{ value: 72, label: ui.pdf2jpg.low }, { value: 150, label: ui.pdf2jpg.medium }, { value: 200, label: ui.pdf2jpg.high }]} />
          <Field label={ui.pdf2jpg.pagesLabel} htmlFor="pdf2jpg-pages" help={ui.pdf2jpg.pagesHelp}>
            <input id="pdf2jpg-pages" className={inputClass} value={ranges} onChange={(e) => setRanges(e.target.value)} autoComplete="off" />
          </Field>
          <PrimaryButton disabled={pages === null || runner.status === 'running'} onClick={convert}>{ui.pdf2jpg.button}</PrimaryButton>
        </>
      )}
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
    </ToolFrame>
  );
}
