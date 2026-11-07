import { useState } from 'react';
import { rotatePdf } from '../../../lib/pdf/operations';
import { baseName } from '../../../lib/utils/format';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { Choice, Field, PrimaryButton, inputClass } from '../shared/atoms';
import { useRunner } from '../shared/useRunner';
import { useSinglePdf } from '../shared/useSinglePdf';
import { fill, pdfBlob, pdfHint, type WorkspaceProps } from './common';

type Angle = 90 | 180 | 270;
type Scope = 'all' | 'selected';

export default function RotateTool({ lang, ui }: WorkspaceProps) {
  const runner = useRunner(ui);
  const { files, file, pages } = useSinglePdf(ui, runner);
  const [angle, setAngle] = useState<Angle>(90);
  const [scope, setScope] = useState<Scope>('all');
  const [ranges, setRanges] = useState('');

  const rotate = () => {
    if (!file) return;
    runner.run(async (report) => {
      const bytes = await rotatePdf(file, { angle, ranges: scope === 'all' ? '' : ranges }, report);
      return { files: [{ name: `${baseName(file.name)}-rotated.pdf`, blob: pdfBlob(bytes) }] };
    });
  };

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} onReset={files.clear}>
      {!file ? (
        <DropZone id="rotate-input" ui={ui} multiple={false} accept=".pdf,application/pdf" hint={pdfHint(ui)} onFiles={files.add} />
      ) : (
        <>
          <FileList ui={ui} lang={lang} items={files.items} reorderable={false} onMove={files.move} onRemove={files.remove} />
          {pages !== null ? <p className="text-sm text-slate-600">{fill(ui.common.pages, { n: pages })}</p> : null}
          <Choice<Angle> name="rotate-angle" legend={ui.rotate.angle} value={angle} onChange={setAngle}
            options={[{ value: 90, label: ui.rotate.a90 }, { value: 180, label: ui.rotate.a180 }, { value: 270, label: ui.rotate.a270 }]} />
          <Choice<Scope> name="rotate-scope" legend={ui.rotate.applyTo} value={scope} onChange={setScope}
            options={[{ value: 'all', label: ui.rotate.all }, { value: 'selected', label: ui.rotate.selected }]} />
          {scope === 'selected' ? (
            <Field label={ui.rotate.pagesLabel} htmlFor="rotate-pages" help={ui.rotate.pagesHelp}>
              <input id="rotate-pages" className={inputClass} value={ranges} onChange={(e) => setRanges(e.target.value)} autoComplete="off" />
            </Field>
          ) : null}
          <PrimaryButton disabled={pages === null || runner.status === 'running'} onClick={rotate}>{ui.rotate.button}</PrimaryButton>
        </>
      )}
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
    </ToolFrame>
  );
}
