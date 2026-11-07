import { useState } from 'react';
import { protectPdf } from '../../../lib/pdf/protect';
import { baseName } from '../../../lib/utils/format';
import DropZone from '../shared/DropZone';
import FileList from '../shared/FileList';
import ToolFrame from '../shared/ToolFrame';
import { Field, PrimaryButton, inputClass } from '../shared/atoms';
import { useRunner } from '../shared/useRunner';
import { useSinglePdf } from '../shared/useSinglePdf';
import { pdfBlob, pdfHint, type WorkspaceProps } from './common';

export default function ProtectTool({ lang, ui }: WorkspaceProps) {
  const runner = useRunner(ui);
  const { files, file } = useSinglePdf(ui, runner, false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);

  const tooShort = password.length > 0 && password.length < 6;
  const mismatch = confirm.length > 0 && confirm !== password;
  const canRun = !!file && password.length >= 6 && password === confirm && runner.status !== 'running';

  const protect = () => {
    if (!file) return;
    const secret = password;
    runner.run(async (report) => {
      const bytes = await protectPdf(file, secret, report);
      setPassword('');
      setConfirm('');
      return { files: [{ name: `${baseName(file.name)}-protected.pdf`, blob: pdfBlob(bytes) }] };
    });
  };

  return (
    <ToolFrame ui={ui} lang={lang} runner={runner} onReset={files.clear}>
      {!file ? (
        <DropZone id="protect-input" ui={ui} multiple={false} accept=".pdf,application/pdf" hint={pdfHint(ui)} onFiles={files.add} />
      ) : (
        <>
          <FileList ui={ui} lang={lang} items={files.items} reorderable={false} onMove={files.move} onRemove={files.remove} />
          <Field label={ui.protect.password} htmlFor="protect-password" help={tooShort ? ui.protect.tooShort : undefined}>
            <input id="protect-password" type={show ? 'text' : 'password'} className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          </Field>
          <Field label={ui.protect.confirm} htmlFor="protect-confirm" help={mismatch ? ui.protect.mismatch : undefined}>
            <input id="protect-confirm" type={show ? 'text' : 'password'} className={inputClass} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
          </Field>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} className="h-4 w-4 accent-brand-700" />
            {ui.protect.show}
          </label>
          <p className="text-sm text-slate-600">{ui.protect.note}</p>
          <PrimaryButton disabled={!canRun} onClick={protect}>{ui.protect.button}</PrimaryButton>
        </>
      )}
      {files.problems.map((p) => <p key={p} role="alert" className="text-sm text-red-700">{p}</p>)}
    </ToolFrame>
  );
}
