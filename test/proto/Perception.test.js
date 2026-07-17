import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes correctly', () => {
  const result = perception.categorizeSensoryInputs(['text', 123, true, 'more text', 456]);
  assert.deepEqual(result, { strings: ['text', 'more text'], numbers: [123, 456], others: [true] });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, { strings: [], numbers: [], others: [] });
});
