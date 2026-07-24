import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify method categorizes inputs correctly', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40]
  });
});

test('classify method throws TypeError for invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'invalid'), TypeError);
});

test('classify method throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.classify('invalid', { low: 1 }), TypeError);
});

test('classify method handles empty inputs', () => {
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, { low: [] });
});

