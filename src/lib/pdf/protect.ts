import { ToolError } from '../errors';
import { readBytes } from './core';

const latin1 = (bytes: Uint8Array): string => {
  let text = '';
  const step = 8192;
  for (let i = 0; i < bytes.length; i += step) text += String.fromCharCode(...bytes.subarray(i, i + step));
  return text;
};

const isEncrypted = (bytes: Uint8Array): boolean => latin1(bytes).includes('/Encrypt');

/**
 * Cifrado AES-256 real con qpdf (WebAssembly), cargado solo al usar esta herramienta.
 * Comprueba que el resultado contiene el diccionario /Encrypt antes de devolverlo.
 */
export async function protectPdf(file: File, password: string, onProgress: (percent: number) => void): Promise<Uint8Array> {
  const input = await readBytes(file);
  if (isEncrypted(input)) throw new ToolError('encrypted');
  onProgress(10);

  let qpdf;
  try {
    const { default: createModule } = await import('@neslinesli93/qpdf-wasm');
    qpdf = await createModule({
      locateFile: () => '/qpdf.wasm',
      noInitialRun: true,
      print: () => {},
      printErr: () => {},
    });
  } catch {
    throw new ToolError('engine');
  }
  onProgress(45);

  try {
    qpdf.FS.writeFile('/in.pdf', input);
    try {
      qpdf.callMain(['--encrypt', password, password, '256', '--', '/in.pdf', '/out.pdf']);
    } catch {
      // Emscripten puede lanzar al terminar; se valida el archivo resultante abajo.
    }
    let output: Uint8Array;
    try {
      output = qpdf.FS.readFile('/out.pdf');
    } catch {
      throw new ToolError('corrupt');
    }
    const head = String.fromCharCode(...output.subarray(0, 5));
    if (head !== '%PDF-' || !isEncrypted(output)) throw new ToolError('engine');
    onProgress(95);
    return output.slice();
  } finally {
    for (const path of ['/in.pdf', '/out.pdf']) {
      try { qpdf.FS.unlink(path); } catch { /* ya borrado */ }
    }
  }
}
