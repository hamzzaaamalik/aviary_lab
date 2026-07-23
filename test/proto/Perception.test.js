import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify includes empty categories when specified', () => {
  const inputs = [10, 20, 30];
  const categories = { high: 15, low: 5, none: 50 };
  const result = perception.classify(inputs, categories, true);
  assert.deepEqual(result, {
    high: [20, 30],
    low: [10, 20, 30],
    none: []
  });
});

test('classify excludes empty categories when not specified', () => {
  const inputs = [10, 20, 30];
  const categories = { high: 15, low: 5, none: 50 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    high: [20, 30],
    low: [10, 20, 30]
  });
});

test('classify throws TypeError for invalid categories input', () => {
  const inputs = [10, 20, 30];
  assert.throws(() => perception.classify(inputs, 'invalid'), TypeError);
});

test('classify throws TypeError for non-numeric thresholds', () => {
  const inputs = [10, 20, 30];
  const categories = { high: 'invalid', low: 5 };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('detect throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect('invalid', 10), TypeError);
});

test('filter throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'invalid'), TypeError);
});
