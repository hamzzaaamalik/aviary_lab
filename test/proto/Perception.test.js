import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles invalid category values', () => {
  const inputs = [1, 2, 3, 4, 5];
  assert.throws(() => perception.classify(inputs, { low: 'notANumber' }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: null }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 2, high: undefined }), TypeError);
});

test('classify returns expected classification', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

