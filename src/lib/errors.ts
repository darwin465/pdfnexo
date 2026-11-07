export type ToolErrorCode =
  | 'type' | 'size' | 'empty' | 'signature' | 'encrypted' | 'corrupt'
  | 'range-empty' | 'range-invalid' | 'charset' | 'memory' | 'tooMany'
  | 'noFiles' | 'minFiles' | 'engine' | 'unknown';

/** Error controlado: el código se traduce a un mensaje comprensible en la interfaz. */
export class ToolError extends Error {
  readonly code: ToolErrorCode;
  constructor(code: ToolErrorCode) {
    super(code);
    this.name = 'ToolError';
    this.code = code;
  }
}

export const toToolError = (error: unknown): ToolError =>
  error instanceof ToolError ? error : new ToolError('unknown');
