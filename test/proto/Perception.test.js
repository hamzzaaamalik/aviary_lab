import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize inputs by thresholds', () => {
  const inputs = [5, 10, 15, 20];
  const categories = { low: 5, medium: 15, high: 20 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [5, 10, 15, 20], medium: [15, 20], high: [20] });
});

test('categorize inputs with empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5, medium: 10 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {});
});

test('categorize inputs with includeEmpty flag', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5, medium: 10 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], medium: [] });
});

test('categorize throws on invalid inputs', () => {
  assert.throws(() => perception.categorize('invalid', {}), TypeError);
  assert.throws(() => perception.categorize([], 'invalid'), TypeError);
  assert.throws(() => perception.categorize([], null), TypeError);
});
