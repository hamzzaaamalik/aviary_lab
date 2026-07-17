import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process handles null input', () => {
  const result = perception.process([null]);
  assert.deepEqual(result, { categorized: { object: [null] }, errors: [] });
});

test('process handles nested arrays', () => {
  const result = perception.process([[1, 2], [3, 4]]);
  assert.deepEqual(result, { categorized: { object: [[1, 2], [3, 4]] }, errors: [] });
});

test('process reports validation errors', () => {
  const result = perception.process(['valid', 123, {}]);
  assert.deepEqual(result, { categorized: { string: ['valid'], number: [123], object: [{}] }, errors: [] });
});

test('process throws error for non-array input', () => {
  assert.throws(() => perception.process('not an array'), TypeError);
});

test('process throws error for empty array', () => {
  assert.throws(() => perception.process([]), TypeError);
});
