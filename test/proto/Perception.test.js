import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on empty inputs', () => {
  const categories = { low: 2 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify throws on invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify throws on non-finite thresholds', () => {
  const inputs = [1, 2, 3];
  const categories = { low: NaN };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

