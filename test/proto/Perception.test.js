import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs based on thresholds', () => {
  const inputs = [10, 20, 30, 40, 50];
  const thresholds = { low: 20, medium: 30, high: 40 };
  const classified = perception.classify(inputs, thresholds);
  assert.deepEqual(classified, {
    low: [20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50],
  });
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'string' }), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify returns empty object for empty inputs', () => {
  const thresholds = { low: 10 };
  const classified = perception.classify([], thresholds);
  assert.deepEqual(classified, {});
});

