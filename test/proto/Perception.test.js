import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify inputs correctly', () => {
  const inputs = [5, 10, 15, 20];
  const categories = { low: 10, high: 15 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [10, 15, 20], high: [15, 20] });
});

test('classify throws on empty input', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError, 'Sensory inputs cannot be empty.');
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError, 'Categories must be an object.');
  assert.throws(() => perception.classify([1, 2], {}), TypeError, 'Categories cannot be an empty object.');
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], { low: 'a' }), TypeError, 'All thresholds must be finite numbers.');
});

test('detect noise correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [3, 4, 5]);
});

test('filter works correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.filter(inputs, (num) => num > 2);
  assert.deepEqual(result, [3, 4, 5]);
});
