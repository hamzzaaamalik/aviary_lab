import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on invalid thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, { low: 'invalid' }), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify handles empty inputs', () => {
  const result = perception.classify([], { low: 2, high: 4 });
  assert.deepEqual(result, {});
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify(null, { low: 2 }), TypeError);
  assert.throws(() => perception.classify([NaN], { low: 2 }), TypeError);
});

