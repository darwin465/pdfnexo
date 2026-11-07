import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePageRanges, chunkIndices } from '../src/lib/pdf/ranges.ts';

test('rangos simples y abiertos', () => {
  assert.deepEqual(parsePageRanges('1-3, 5, 8-', 9), [[0, 1, 2], [4], [7, 8]]);
  assert.deepEqual(parsePageRanges('-2', 5), [[0, 1]]);
});
test('rangos inválidos', () => {
  for (const bad of ['0', '3-2', '1-99', 'a', '-', '1--2', ',,']) {
    assert.throws(() => parsePageRanges(bad, 5), { name: 'ToolError' }, bad);
  }
});
test('chunkIndices', () => {
  assert.deepEqual(chunkIndices(5, 2), [[0, 1], [2, 3], [4]]);
});
