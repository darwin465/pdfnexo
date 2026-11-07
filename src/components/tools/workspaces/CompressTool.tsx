import { useState } from 'react';
import { compressStrong } from '../../../lib/pdf/convert';
import { compressLight } from '../../../lib/pdf/operations';
import { baseName, formatBytes } from '../../../lib/utils/format';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { Choice, PrimaryButton } from '../shared/atoms';
import { useRunner } from '../shared/useRunner';
import { useSinglePdf } from '../shared/useSinglePdf';
import { fill, pdfBlob, pdfHint, type WorkspaceProps } from './common';

type Method = 'light' | 'strong';
type Level = 'low' | 'medium' | 'high';

const LEVELS = {
  low: { dpi: 72, quality: 0.55 },
  medium: { dpi: 110, quality: 0.7 },
  high: { dpi: 150, quality: 0.8 },
} as const;

export default function CompressTool({ lang, ui }: WorkspaceProps) {
  const runner = useRunner(ui);
  const { files, file } = useSinglePdf(ui, runner, false);
  const [method, setMethod] = useState<Method>('strong');
  const [level, setLevel] = useState<Level>('medium');

  const compress = () => {
    if (!file) return;
    runner.run(async (report) => {
      const bytes = method === 'light'
        ? await compressLight(file, report)
        : await compressStrong(file, LEVELS[level], report);
      // Solo se ofrece el resultado si de verdad pesa menos que el original.
      if (bytes.byteLength >= file.size) return { files: [], notice: ui.compress.noReduction };
      const percent = Math.round((1 - bytes.byteLength / file.size) * 100);
      return {
        files: [{ name: `${baseName(file.name)}-compressed.pdf`, blob: pdfBlob(bytes) }],
        summary: `${ui.compress.before}: ${formatBytes(file.size, lang)} → ${ui.compress.after}: ${formatBytes(bytes.byteLength, lang)} · ${fill(ui.compress.saved, { p: percent })}`,
      };
    });
  };

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} onReset={files.clear}>
      {!file ? (
        <DropZone id="compress-input" ui={ui} multiple={false} accept=".pdf,application/pdf" hint={pdfHint(ui)} onFiles={files.add} />
      ) : (
        <>
          <FileList ui={ui} lang={lang} items={files.items} reorderable={false} onMove={files.move} onRemove={files.remove} />
          <Choice<Method> name="compress-method" legend={ui.compress.mode} value={method} onChange={setMethod}
            options={[{ value: 'strong', label: ui.compress.strong }, { value: 'light', label: ui.compress.light }]} />
          <p className="text-sm text-slate-600">{method === 'strong' ? ui.compress.strongHelp : ui.compress.lightHelp}</p>
          {method === 'strong' ? (
            <Choice<Level> name="compress-level" legend={ui.compress.level} value={level} onChange={setLevel}
              options={[{ value: 'low', label: ui.compress.low }, { value: 'medium', label: ui.compress.medium }, { value: 'high', label: ui.compress.high }]} />
          ) : null}
          <PrimaryButton disabled={runner.status === 'running'} onClick={compress}>{ui.compress.button}</PrimaryButton>
        </>
      )}
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
    </ToolFrame>
  );
}
