import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('categorize sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4, high: 6 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], medium: [4, 5], high: [] });
});

test('categorize with empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 4, medium: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [], medium: [] });
});

test('categorize includes empty categories', () => {
  const inputs = [1, 2];
  const categories = { low: 1, medium: 3 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [1, 2], medium: [] });
});

test('categorize throws on invalid category', () => {
  assert.throws(() => perception.categorize([1, 2], 'not-an-object'), TypeError);
});

test('categorize throws on invalid input', () => {
  assert.throws(() => perception.categorize('not-an-array', { low: 1 }), TypeError);
});
