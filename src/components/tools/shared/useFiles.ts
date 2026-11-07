import { useCallback, useRef, useState } from 'react';
import { ToolError } from '../../../lib/errors';
import { validateFile, type FileKind } from '../../../lib/validation/files';
import type { Ui } from '../../../i18n/ui.types';

export interface FileItem {
  id: number;
  file: File;
}

/** Lista de archivos validados (extensión, MIME, tamaño y firma real). */
export function useFiles(kind: FileKind, multiple: boolean, maxFiles: number, ui: Ui) {
  const [items, setItems] = useState<FileItem[]>([]);
  const [problems, setProblems] = useState<string[]>([]);
  const nextId = useRef(1);

  const add = useCallback(
    async (incoming: File[]) => {
      const accepted: FileItem[] = [];
      const messages: string[] = [];
      for (const file of incoming) {
        const error = await validateFile(file, kind);
        if (error) messages.push(`${file.name}: ${ui.errors[error.code]}`);
        else accepted.push({ id: nextId.current++, file });
      }
      setItems((current) => {
        if (!multiple) return accepted.length ? [accepted[0] as FileItem] : current;
        const merged = [...current, ...accepted];
        if (merged.length > maxFiles) {
          messages.push(ui.errors[new ToolError('tooMany').code]);
          return merged.slice(0, maxFiles);
        }
        return merged;
      });
      setProblems(messages);
    },
    [kind, multiple, maxFiles, ui],
  );

  const remove = useCallback((id: number) => setItems((c) => c.filter((i) => i.id !== id)), []);
  const move = useCallback((id: number, delta: -1 | 1) => {
    setItems((current) => {
      const index = current.findIndex((i) => i.id === id);
      const target = index + delta;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const copy = [...current];
      const [moved] = copy.splice(index, 1);
      copy.splice(target, 0, moved as FileItem);
      return copy;
    });
  }, []);
  const clear = useCallback(() => {
    setItems([]);
    setProblems([]);
  }, []);

  return { items, problems, add, remove, move, clear };
}
