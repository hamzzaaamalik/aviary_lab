import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs based on categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 2,
    high: 4
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: { inputs: [2, 3, 4, 5], count: 4 },
    high: { inputs: [4, 5], count: 2 }
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], 'invalid'), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws on invalid thresholds', () => {
  const categories = {
    low: 'notANumber',
  };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});

test('classify handles negative thresholds', () => {
  const inputs = [-1, 0, 1, 2];
  const categories = {
    nonNegative: 0,
    negative: -1
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    nonNegative: { inputs: [0, 1, 2], count: 3 },
    negative: { inputs: [-1, 0, 1, 2], count: 4 }
  });
});

test('classify throws on invalid input types', () => {
  assert.throws(() => perception.classify([1, 2, 'three'], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2, null], { low: 1 }), TypeError);
});

