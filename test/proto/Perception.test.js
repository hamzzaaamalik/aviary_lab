import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups sensory inputs by categories', () => {
  const inputs = [5, 15, 25, 35];
  const categories = { low: 10, medium: 20, high: 30 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [15, 25, 35], medium: [25, 35], high: [35] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5, medium: 2 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], medium: [2, 3] });
});

test('categorize throws on invalid input', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([1, 2], null), TypeError);
});

test('categorize throws on non-numeric category thresholds', () => {
  assert.throws(() => perception.categorize([1, 2], { low: 'a' }), TypeError);
});

