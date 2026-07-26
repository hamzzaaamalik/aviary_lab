import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify sensory inputs into categories', () => {
  const inputs = [1, 5, 10, 15, 20];
  const categories = {
    low: 5,
    medium: 10,
    high: 15
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [5, 10, 15, 20],
    medium: [10, 15, 20],
    high: [15, 20]
  });
});

test('classify throws for empty inputs', () => {
  const categories = {
    low: 5,
    high: 15
  };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify throws for invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

