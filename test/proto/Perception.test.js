import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize throws TypeError for empty inputs', () => {
  assert.throws(() => {
    perception.categorize([], { high: 5 });
  }, { message: 'Sensory inputs cannot be empty.' });
});

test('categorize throws TypeError for invalid categories input', () => {
  assert.throws(() => {
    perception.categorize([1, 2, 3], null);
  }, { message: 'Categories must be an object.' });
});

test('categorize returns categorized inputs', () => {
  const result = perception.categorize([1, 2, 3, 4, 5], { low: 1, medium: 3, high: 5 });
  assert.deepEqual(result, { low: [1, 2, 3, 4, 5], medium: [3, 4, 5], high: [5] });
});

test('categorize includes empty categories when specified', () => {
  const result = perception.categorize([1, 2, 3], { low: 1, medium: 5 }, true);
  assert.deepEqual(result, { low: [1, 2, 3], medium: [] });
});