import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, X } from 'lucide-react';
import type { Ui } from '../../../i18n/ui.types';
import { formatBytes } from '../../../lib/utils/format';
import type { FileItem } from './useFiles';

function ImageThumb({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return url ? <img src={url} alt="" className="h-12 w-12 flex-none rounded-md border border-slate-200 object-cover" /> : <span className="h-12 w-12 flex-none" />;
}

interface Props {
  ui: Ui;
  lang: string;
  items: FileItem[];
  reorderable: boolean;
  thumbnails?: boolean;
  onMove: (id: number, delta: -1 | 1) => void;
  onRemove: (id: number) => void;
}

const iconButton = 'flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-40';

export default function FileList({ ui, lang, items, reorderable, thumbnails, onMove, onRemove }: Props) {
  if (items.length === 0) return null;
  return (
    <section aria-label={ui.common.fileList}>
      <ol className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
            {thumbnails ? <ImageThumb file={item.file} /> : null}
            <span className="w-6 flex-none text-center text-sm font-semibold text-slate-400">{index + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-slate-900">{item.file.name}</span>
              <span className="block text-xs text-slate-500">{formatBytes(item.file.size, lang)}</span>
            </span>
            {reorderable ? (
              <>
                <button type="button" className={iconButton} disabled={index === 0} onClick={() => onMove(item.id, -1)} aria-label={`${ui.actions.moveUp}: ${item.file.name}`}>
                  <ArrowUp size={16} aria-hidden="true" />
                </button>
                <button type="button" className={iconButton} disabled={index === items.length - 1} onClick={() => onMove(item.id, 1)} aria-label={`${ui.actions.moveDown}: ${item.file.name}`}>
                  <ArrowDown size={16} aria-hidden="true" />
                </button>
              </>
            ) : null}
            <button type="button" className={iconButton} onClick={() => onRemove(item.id)} aria-label={`${ui.actions.remove}: ${item.file.name}`}>
              <X size={16} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
