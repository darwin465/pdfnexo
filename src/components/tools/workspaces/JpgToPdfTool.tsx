import { useState } from 'react';
import { LIMITS } from '../../../lib/validation/files';
import { imagesToPdf, type PageSizeMode } from '../../../lib/pdf/images';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { Choice, PrimaryButton } from '../shared/atoms';
import { useFiles } from '../shared/useFiles';
import { useRunner } from '../shared/useRunner';
import { imageHint, pdfBlob, type WorkspaceProps } from './common';

export default function JpgToPdfTool({ lang, ui }: WorkspaceProps) {
  const files = useFiles('image', true, LIMITS.maxImageFiles, ui);
  const runner = useRunner(ui);
  const [mode, setMode] = useState<PageSizeMode>('fit');

  const create = () =>
    runner.run(async (report) => {
      const bytes = await imagesToPdf(files.items.map((i) => i.file), mode, report);
      return { files: [{ name: 'images.pdf', blob: pdfBlob(bytes) }] };
    });

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} onReset={files.clear}>
      <DropZone id="jpg-input" ui={ui} multiple accept=".jpg,.jpeg,.png,image/jpeg,image/png" hint={imageHint(ui)} onFiles={files.add} />
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
      <FileList ui={ui} lang={lang} items={files.items} reorderable thumbnails onMove={files.move} onRemove={files.remove} />
      {files.items.length > 0 ? (
        <>
          <p className="text-sm text-slate-600">{ui.jpg.hint}</p>
          <Choice<PageSizeMode> name="jpg-size" legend={ui.jpg.pageSize} value={mode} onChange={setMode}
            options={[{ value: 'fit', label: ui.jpg.fit }, { value: 'a4', label: ui.jpg.a4 }]} />
        </>
      ) : null}
      <PrimaryButton disabled={files.items.length === 0 || runner.status === 'running'} onClick={create}>{ui.jpg.button}</PrimaryButton>
    </ToolFrame>
  );
}
