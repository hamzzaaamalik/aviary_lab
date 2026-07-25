import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('Perception.categorize categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = [5, 10, 15, 20];
  const categories = {
    low: 10,
    medium: 15,
    high: 20
  };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    low: [10, 15, 20],
    medium: [15, 20],
    high: [20]
  });
});

test('Perception.categorize throws on invalid inputs', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorize([], {}), TypeError);
  assert.throws(() => perception.categorize([1, 2, 3], null), TypeError);
  assert.throws(() => perception.categorize([1, 2, 3], { low: 'not-a-number' }), TypeError);
});

