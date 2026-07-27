import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs based on thresholds', () => {
  const sensoryInputs = [10, 20, 30, 40, 50];
  const categories = {
    low: 15,
    medium: 25,
    high: 35
  };
  const result = perception.classify(sensoryInputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50]
  });
});

test('classify throws on invalid input', () => {
  const categories = { low: 15 };
  assert.throws(() => perception.classify('not an array', categories), TypeError);
  assert.throws(() => perception.classify([], 'not an object'), TypeError);
  assert.throws(() => perception.classify([], { low: 'not a number' }), TypeError);
});

test('classify throws on empty categories', () => {
  const sensoryInputs = [10, 20];
  assert.throws(() => perception.classify(sensoryInputs, {}), TypeError);
});
