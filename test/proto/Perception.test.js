import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by categories', () => {
  const inputs = [10, 20, 30, 40, 50];
  const categories = { low: 15, medium: 25, high: 35 };
  const expected = {
    low: [20, 30, 40, 50],
    medium: [30, 40, 50],
    high: [40, 50],
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, expected);
});

test('classify throws on empty inputs', () => {
  const categories = { low: 1 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10, 20, 30];
  const categories = { low: 'invalid' };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

test('classify handles invalid sensory inputs', () => {
  const inputs = [10, 'a', 30];
  const categories = { low: 1 };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

