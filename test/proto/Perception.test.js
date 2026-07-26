import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify method categorizes inputs correctly', () => {
  const inputs = [10, 15, 20, 5];
  const categories = { low: 0, medium: 10, high: 15 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [10, 15, 20, 5],
    medium: [10, 15, 20],
    high: [15, 20]
  });
});

test('classify method handles empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 0 }), TypeError);
});

test('classify method handles invalid categories', () => {
  assert.throws(() => perception.classify([10], null), TypeError);
  assert.throws(() => perception.classify([10], {}), TypeError);
});

test('classify method handles non-finite thresholds', () => {
  assert.throws(() => perception.classify([10], { low: NaN }), TypeError);
  assert.throws(() => perception.classify([10], { low: Infinity }), TypeError);
});

test('classify method categorizes inputs with multiple matching categories', () => {
  const inputs = [10, 15, 20, 5];
  const categories = { low: 5, medium: 10, high: 15 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [10, 15, 20, 5],
    medium: [10, 15, 20],
    high: [15, 20]
  });
});

