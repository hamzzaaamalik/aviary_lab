import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by thresholds', () => {
  const inputs = [10, 20, 30, 40, 50];
  const thresholds = { low: 20, high: 40 };
  const expected = {
    low: [20, 30, 40, 50],
    high: [40, 50]
  };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, expected);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { low: '20' }), TypeError);
  assert.throws(() => perception.classify(inputs, { }), TypeError);
});

test('classify returns empty object for empty inputs', () => {
  const thresholds = { low: 20 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify checks input types', () => {
  const thresholds = { low: 20 };
  assert.throws(() => perception.classify('not an array', thresholds), TypeError);
});
