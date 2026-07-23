import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize categorizes inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('categorize includes empty categories if requested', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 4, high: 2 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { low: [], high: [2, 3] });
});


test('categorize throws on invalid inputs', () => {
  assert.throws(() => perception.categorize('not an array', {}), TypeError);
  assert.throws(() => perception.categorize([1, 2], 'not an object'), TypeError);
  assert.throws(() => perception.categorize([1, 2], { low: 'not a number' }), TypeError);
});
