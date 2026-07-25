import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by category thresholds', () => {
  const inputs = [10, 20, 30, 40, 50];
  const categories = {
    low: 15,
    medium: 25,
    high: 35,
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50],
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
});

test('classify throws on invalid threshold', () => {
  const categories = { invalid: NaN };
  assert.throws(() => perception.classify([1, 2, 3], categories), TypeError);
});

