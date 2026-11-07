import test from 'node:test';
import assert from 'node:assert/strict';
import { validateFile } from '../src/lib/validation/files.ts';
import { getJpegOrientation } from '../src/lib/pdf/images.ts';

const pdf = (name = 'a.pdf', body = '%PDF-1.7\n1 0 obj') => new File([body], name, { type: 'application/pdf' });

test('PDF válido', async () => assert.equal(await validateFile(pdf(), 'pdf'), null));
test('extensión incorrecta', async () => assert.equal((await validateFile(pdf('a.txt'), 'pdf'))?.code, 'type'));
test('MIME incorrecto', async () => {
  const f = new File(['%PDF-1.7'], 'a.pdf', { type: 'text/html' });
  assert.equal((await validateFile(f, 'pdf'))?.code, 'type');
});
test('archivo vacío', async () => assert.equal((await validateFile(pdf('a.pdf', ''), 'pdf'))?.code, 'empty'));
test('firma falsa (HTML con extensión .pdf)', async () => {
  assert.equal((await validateFile(pdf('a.pdf', '<html>'), 'pdf'))?.code, 'signature');
});
test('imagen JPEG y PNG válidas', async () => {
  const jpg = new File([new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0])], 'a.jpg', { type: 'image/jpeg' });
  const png = new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0, 0])], 'a.png', { type: 'image/png' });
  assert.equal(await validateFile(jpg, 'image'), null);
  assert.equal(await validateFile(png, 'image'), null);
});

test('orientación EXIF', () => {
  // SOI + APP1 (Exif) con IFD0 que contiene tag 0x0112 = 6, little endian
  const exif = [
    0x45, 0x78, 0x69, 0x66, 0, 0, // "Exif\0\0"
    0x49, 0x49, 0x2a, 0, 8, 0, 0, 0, // TIFF header, IFD en offset 8
    1, 0, // 1 entrada
    0x12, 0x01, 3, 0, 1, 0, 0, 0, 6, 0, 0, 0, // tag 0x0112, SHORT, count 1, valor 6
  ];
  const len = exif.length + 2;
  const bytes = new Uint8Array([0xff, 0xd8, 0xff, 0xe1, len >> 8, len & 255, ...exif, 0xff, 0xd9]);
  assert.equal(getJpegOrientation(bytes), 6);
  assert.equal(getJpegOrientation(new Uint8Array([0xff, 0xd8, 0xff, 0xd9])), 1);
});
