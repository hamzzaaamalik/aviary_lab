import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify: correctly classifies sensory inputs', () => {
  const inputs = [0.5, 1.5, 2.5, 3.5];
  const categories = { low: 1, medium: 2, high: 3 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [1.5, 2.5, 3.5],
    medium: [2.5, 3.5],
    high: [3.5]
  });
});

test('classify: throws on empty input', () => {
  const categories = { low: 1 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify: throws on invalid categories', () => {
  const inputs = [0.5, 1.5];
  assert.throws(() => perception.classify(inputs, 'invalid'), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify: throws on invalid thresholds', () => {
  const inputs = [0.5, 1.5];
  const categories = { valid: 1, invalid: NaN };
  assert.throws(() => perception.classify(inputs, categories), TypeError);
});

