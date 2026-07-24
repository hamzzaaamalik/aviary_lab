import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups sensory inputs into categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2];
  const categories = { low: 3, high: 0 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], high: [1, 2] });
});

test('categorize throws on invalid inputs', () => {
  assert.throws(() => perception.categorize('not an array', {}), TypeError);
  assert.throws(() => perception.categorize([], 'not an object'), TypeError);
  assert.throws(() => perception.categorize([], { valid: 'not a number' }), TypeError);
});
