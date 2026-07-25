import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 2,
    medium: 4,
    high: 6
  };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    medium: [4, 5],
  });
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = {
    low: 1,
    medium: 5,
    high: 6
  };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, {
    low: [1, 2, 3],
    medium: [],
    high: []
  });
});

test('categorize throws on invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.categorize(inputs, { invalid: 'not a number' }), TypeError);
});

test('categorize throws on non-array inputs', () => {
  assert.throws(() => perception.categorize('not an array', {}), TypeError);
});
