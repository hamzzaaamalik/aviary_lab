import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 1, medium: 3 };  
  const expected = { low: [1, 2, 3, 4, 5], medium: [3, 4, 5] };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, { high: 'three' }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: Infinity }), TypeError);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify({}, { low: 1 }), TypeError);
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

