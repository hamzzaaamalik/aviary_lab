import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by thresholds', () => {
  const inputs = [1, 5, 10, 15];
  const thresholds = { low: 5, high: 10 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [5, 10, 15], high: [10, 15] });
});

test('classify throws on invalid thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { invalid: 'string' }), TypeError);
});

test('classify returns empty object for no inputs', () => {
  const thresholds = { low: 5 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

