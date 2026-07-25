import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify returns correct categories', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: { inputs: [20, 30, 40], count: 3 },
    medium: { inputs: [30, 40], count: 2 },
    high: { inputs: [40], count: 1 }
  });
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 20, 30];
  const categories = { low: 'high', medium: 25 };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('categorize groups inputs by category function', () => {
  const inputs = [10, 20, 30, 40];
  const categoryFn = (input) => {
    if (input < 20) return 'low';
    if (input < 30) return 'medium';
    return 'high';
  };
  const result = perception.categorize(inputs, categoryFn);
  assert.deepEqual(result, {
    low: [10],
    medium: [20],
    high: [30, 40]
  });
});

test('categorize throws on invalid category function', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.categorize(inputs, 'not-a-function'), TypeError);
});
