// Copia el motor qpdf (WebAssembly) a /public para la herramienta "Proteger PDF".
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = 'node_modules/@neslinesli93/qpdf-wasm';
const find = (dir) => {
  if (!existsSync(dir)) return null;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) { const hit = find(full); if (hit) return hit; }
    else if (entry === 'qpdf.wasm') return full;
  }
  return null;
};
const source = find(root);
if (!source) {
  console.warn('[pdfnexo] No se encontró qpdf.wasm: "Proteger PDF" mostrará un error de motor hasta instalarlo.');
} else {
  mkdirSync('public', { recursive: true });
  copyFileSync(source, 'public/qpdf.wasm');
  console.log('[pdfnexo] qpdf.wasm copiado a public/');
}
