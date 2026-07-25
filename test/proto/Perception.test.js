import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles empty categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError, 'Categories cannot be an empty object.');
});

test('classify throws on non-number thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { low: 'not-a-number' }), TypeError, 'Threshold for low must be a number.');
});

test('classify works with valid inputs', () => {
  const result = perception.classify([1, 2, 3, 4], { low: 2, high: 3 });
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('classify throws on empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError, 'Sensory inputs cannot be empty.');
});

test('detect noise', () => {
  const noise = perception.detect([0.5, 1.5, 2.5], 1);
  assert.deepEqual(noise, [1.5, 2.5]);
});

test('filter inputs', () => {
  const filtered = perception.filter([1, 2, 3], x => x > 1);
  assert.deepEqual(filtered, [2, 3]);
});
