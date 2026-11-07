import { useState } from 'react';
import { watermarkPdf, type WatermarkPlan } from '../../../lib/pdf/operations';
import { baseName } from '../../../lib/utils/format';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { Choice, Field, PrimaryButton, inputClass } from '../shared/atoms';
import { useRunner } from '../shared/useRunner';
import { useSinglePdf } from '../shared/useSinglePdf';
import { fill, pdfBlob, pdfHint, type WorkspaceProps } from './common';

export default function WatermarkTool({ lang, ui }: WorkspaceProps) {
  const runner = useRunner(ui);
  const { files, file, pages } = useSinglePdf(ui, runner);
  const [text, setText] = useState('');
  const [size, setSize] = useState(64);
  const [opacity, setOpacity] = useState(0.3);
  const [color, setColor] = useState<WatermarkPlan['color']>('gray');
  const [position, setPosition] = useState<WatermarkPlan['position']>('diagonal');

  const apply = () => {
    if (!file) return;
    runner.run(async (report) => {
      const bytes = await watermarkPdf(file, { text, size, opacity, color, position }, report);
      return { files: [{ name: `${baseName(file.name)}-watermarked.pdf`, blob: pdfBlob(bytes) }] };
    });
  };

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} onReset={files.clear}>
      {!file ? (
        <DropZone id="watermark-input" ui={ui} multiple={false} accept=".pdf,application/pdf" hint={pdfHint(ui)} onFiles={files.add} />
      ) : (
        <>
          <FileList ui={ui} lang={lang} items={files.items} reorderable={false} onMove={files.move} onRemove={files.remove} />
          {pages !== null ? <p className="text-sm text-slate-600">{fill(ui.common.pages, { n: pages })}</p> : null}
          <Field label={ui.watermark.text} htmlFor="wm-text">
            <input id="wm-text" className={inputClass} value={text} maxLength={60} onChange={(e) => setText(e.target.value)} placeholder={ui.watermark.placeholder} autoComplete="off" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`${ui.watermark.size}: ${size}`} htmlFor="wm-size">
              <input id="wm-size" type="range" min={24} max={120} step={2} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-brand-700" />
            </Field>
            <Field label={`${ui.watermark.opacity}: ${Math.round(opacity * 100)}%`} htmlFor="wm-opacity">
              <input id="wm-opacity" type="range" min={0.1} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-brand-700" />
            </Field>
          </div>
          <Choice<WatermarkPlan['color']> name="wm-color" legend={ui.watermark.color} value={color} onChange={setColor}
            options={[{ value: 'gray', label: ui.watermark.gray }, { value: 'red', label: ui.watermark.red }, { value: 'blue', label: ui.watermark.blue }, { value: 'black', label: ui.watermark.black }]} />
          <Choice<WatermarkPlan['position']> name="wm-position" legend={ui.watermark.position} value={position} onChange={setPosition}
            options={[{ value: 'diagonal', label: ui.watermark.diagonal }, { value: 'horizontal', label: ui.watermark.horizontal }]} />
          <PrimaryButton disabled={pages === null || text.trim() === '' || runner.status === 'running'} onClick={apply}>{ui.watermark.button}</PrimaryButton>
        </>
      )}
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
    </ToolFrame>
  );
}
