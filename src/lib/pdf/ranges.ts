import { ToolError } from '../errors';

/**
 * Convierte "1-3, 5, 8-" en grupos de índices (base 0).
 * Cada coma crea un grupo. "3-" significa hasta el final; "-4" desde el principio.
 */
export function parsePageRanges(input: string, total: number): number[][] {
  const parts = input.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) throw new ToolError('range-empty');

  return parts.map((part) => {
    let start: number;
    let end: number;
    if (/^\d+$/.test(part)) {
      start = end = Number(part);
    } else {
      const match = /^(\d*)\s*-\s*(\d*)$/.exec(part);
      if (!match || (match[1] === '' && match[2] === '')) throw new ToolError('range-invalid');
      start = match[1] === '' ? 1 : Number(match[1]);
      end = match[2] === '' ? total : Number(match[2]);
    }
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end > total || start > end) {
      throw new ToolError('range-invalid');
    }
    const group: number[] = [];
    for (let i = start; i <= end; i++) group.push(i - 1);
    return group;
  });
}

export const flattenRanges = (groups: number[][]): number[] => groups.flat();

export const chunkIndices = (total: number, size: number): number[][] => {
  const groups: number[][] = [];
  for (let i = 0; i < total; i += size) {
    groups.push(Array.from({ length: Math.min(size, total - i) }, (_, k) => i + k));
  }
  return groups;
};
