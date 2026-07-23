import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify inputs based on ranges', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: [1, 3], high: [4, 5] };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3], high: [4, 5] });
});

test('classify with empty categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: [10, 20] };
  const result = perception.classify(inputs, categories, true);
  assert.deepEqual(result, { low: [] });
});

test('throws on invalid category thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, { invalid: 'not-a-number' }), TypeError);
});
