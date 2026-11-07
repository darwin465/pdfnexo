export const formatBytes = (bytes: number, locale: string): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  const digits = unit === 0 ? 0 : 1;
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value)} ${units[unit]}`;
};

/** Nombre de archivo seguro, sin extensión. */
export const baseName = (filename: string): string => {
  const clean = filename
    .replace(/\.[^.]+$/, '')
    .replace(/[^\p{L}\p{N}_ -]/gu, '')
    .trim()
    .slice(0, 80);
  return clean || 'document';
};

export const toBlob = (bytes: Uint8Array, type: string): Blob =>
  new Blob([bytes as unknown as BlobPart], { type });
