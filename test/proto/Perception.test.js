import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups sensory inputs into categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [1, 2, 3, 4, 5],
    medium: [3, 4, 5],
    high: [5]
  });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [2, 3];
  const categories = { low: 1, medium: 4, high: 5 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [2, 3],
    medium: [],
    high: []
  });
});

test('categorize throws on invalid inputs', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([1, 2], null), TypeError);
  assert.throws(() => perception.categorize([1, 2], { low: 'notANumber' }), TypeError);
});

