import { useRef, useState, type DragEvent } from 'react';
import { Upload } from 'lucide-react';
import type { Ui } from '../../../i18n/ui.types';

interface Props {
  id: string;
  ui: Ui;
  multiple: boolean;
  accept: string;
  hint: string;
  onFiles: (files: File[]) => void;
}

export default function DropZone({ id, ui, multiple, accept, hint, onFiles }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setActive(true); }}
      onDragEnter={(e) => { e.preventDefault(); setActive(true); }}
      onDragLeave={() => setActive(false)}
      onDrop={handleDrop}
      className={`flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
        active ? 'border-brand-500 bg-brand-50' : 'border-slate-300 bg-white'
      }`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <Upload size={24} aria-hidden="true" />
      </span>
      <p className="text-base font-semibold text-slate-900">{active ? ui.drop.dropNow : ui.drop.dragHere}</p>
      <p className="text-sm text-slate-500">{ui.drop.or}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-xl bg-brand-700 px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-brand-800"
      >
        {multiple ? ui.drop.chooseFiles : ui.drop.chooseFile}
      </button>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = '';
        }}
      />
      <p className="text-xs text-slate-500">{hint}</p>
    </div>
  );
}
