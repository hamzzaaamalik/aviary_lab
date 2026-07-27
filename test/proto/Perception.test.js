import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'invalid'), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { low: 'invalid' }), TypeError);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify('not an array', { low: 0 }), TypeError);
  assert.throws(() => perception.classify([1, 2, NaN], { low: 0 }), TypeError);
});
