import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on empty inputs', () => {
  const categories = { low: 2, high: 4 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify throws on invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'a' }), TypeError);
});

test('classify works with valid inputs', () => {
  const inputs = [3, 4, 5];
  const categories = { medium: 3, high: 5 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { medium: [3, 4, 5], high: [5] });
});
