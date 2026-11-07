import { LIMITS } from '../../../lib/validation/files';
import { mergePdfs } from '../../../lib/pdf/operations';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { PrimaryButton } from '../shared/atoms';
import { useFiles } from '../shared/useFiles';
import { useRunner } from '../shared/useRunner';
import { pdfBlob, pdfHint, type WorkspaceProps } from './common';

export default function MergeTool({ lang, ui }: WorkspaceProps) {
  const files = useFiles('pdf', true, LIMITS.maxPdfFiles, ui);
  const runner = useRunner(ui);

  const merge = () =>
    runner.run(async (report) => {
      const bytes = await mergePdfs(files.items.map((i) => i.file), report);
      return { files: [{ name: 'merged.pdf', blob: pdfBlob(bytes) }] };
    });

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} onReset={files.clear}>
      <DropZone id="merge-input" ui={ui} multiple accept=".pdf,application/pdf" hint={pdfHint(ui)} onFiles={files.add} />
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
      <FileList ui={ui} lang={lang} items={files.items} reorderable onMove={files.move} onRemove={files.remove} />
      <p className="text-sm text-slate-600">{ui.merge.hint}</p>
      <PrimaryButton disabled={files.items.length < 2 || runner.status === 'running'} onClick={merge}>{ui.merge.button}</PrimaryButton>
    </ToolFrame>
  );
}
