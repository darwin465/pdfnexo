declare module '@neslinesli93/qpdf-wasm' {
  interface QpdfModule {
    FS: {
      writeFile(path: string, data: Uint8Array): void;
      readFile(path: string): Uint8Array;
      unlink(path: string): void;
    };
    callMain(args: string[]): number;
  }
  interface QpdfOptions {
    locateFile?: (path: string) => string;
    noInitialRun?: boolean;
    print?: (text: string) => void;
    printErr?: (text: string) => void;
  }
  const createModule: (options?: QpdfOptions) => Promise<QpdfModule>;
  export default createModule;
}
