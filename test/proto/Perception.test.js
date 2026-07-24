import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('categorize groups sensory inputs into predefined categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, medium: 4, high: 6 };
  const expected = {
    low: [2, 3, 4, 5],
    medium: [4, 5],
    high: []
  };
  assert.deepEqual(perception.categorize(inputs, categories), expected);
});

test('categorize includes empty categories when specified', () => {
  const inputs = [1, 1, 1];
  const categories = { low: 1, high: 2 };
  const expected = {
    low: [1, 1, 1],
    high: []
  };
  assert.deepEqual(perception.categorize(inputs, categories, true), expected);
});

test('categorize throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.categorize(null, { low: 1 }), TypeError);
  assert.throws(() => perception.categorize([1, 2], null), TypeError);
  assert.throws(() => perception.categorize([1, 2], { low: 'one' }), TypeError);
});
