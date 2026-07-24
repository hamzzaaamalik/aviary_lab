import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize correctly sorts inputs into categories', () => {
  const inputs = [1, 5, 10, 15];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [5, 10, 15],
    medium: [10, 15],
    high: [15]
  });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5, medium: 10 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [],
    medium: []
  });
});

test('categorize throws TypeError for invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2, 3], 'invalid'), TypeError);
});

test('categorize throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.categorize('invalid', {}), TypeError);
});

