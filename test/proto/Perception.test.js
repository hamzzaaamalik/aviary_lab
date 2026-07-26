import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify sensory inputs based on thresholds', () => {
  const inputs = [0.5, 1.5, 2.5, 3.5];
  const categories = { low: 1, high: 2 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1.5, 2.5, 3.5], high: [2.5, 3.5] });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1], 'invalid'), TypeError);
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1], { low: 'invalid' }), TypeError);
});

test('classify handles valid inputs', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 1, high: 2 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3], high: [2, 3] });
});
