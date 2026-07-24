import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups sensory inputs by category thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [1, 2, 3, 4, 5],
    medium: [3, 4, 5],
    high: [5],
  });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 0, medium: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [1, 2, 3],
    medium: [],
  });
});

test('categorize throws for invalid inputs', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([], null), TypeError);
  assert.throws(() => perception.categorize([], { low: 'string' }), TypeError);
});

test('categorize does not include empty categories by default', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 0, medium: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3] });
});
