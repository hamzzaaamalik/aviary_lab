import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups inputs into defined categories', () => {
  const inputs = [10, 20, 30, 5, 15];
  const categories = { low: 10, high: 20 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [10, 20, 30, 15], high: [20, 30] });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [5, 7, 9];
  const categories = { low: 10, high: 15 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], high: [] });
});

test('categorize throws on invalid inputs', () => {
  assert.throws(() => perception.categorize('not an array', {}), TypeError);
  assert.throws(() => perception.categorize([1, 2, 3], 'not an object'), TypeError);
  assert.throws(() => perception.categorize([1, 2, 3], { invalid: 'not a number' }), TypeError);
});

