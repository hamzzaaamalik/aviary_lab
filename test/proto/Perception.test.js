import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by categories', () => {
  const inputs = [10, 15, 20, 25, 30];
  const categories = { 
    low: 15,
    medium: 20,
    high: 25
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [15, 20, 25, 30],
    medium: [20, 25, 30],
    high: [25, 30]
  });
});

test('classify throws on invalid inputs', () => {
  const categories = { low: 15 };
  assert.throws(() => perception.classify([], categories), TypeError);
  assert.throws(() => perception.classify([10], {}), TypeError);
  assert.throws(() => perception.classify([10], { low: 'not-a-number' }), TypeError);
});

test('classify handles empty categories', () => {
  assert.throws(() => perception.classify([10], {}), TypeError);
});
