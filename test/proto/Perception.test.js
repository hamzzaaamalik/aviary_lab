import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on invalid thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, 'invalid'), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: NaN }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 1, high: NaN }), TypeError);
});

test('classify returns empty object for empty inputs', () => {
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

