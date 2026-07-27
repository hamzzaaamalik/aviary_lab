import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify returns empty object for empty inputs', () => {
  const result = perception.classify([], { low: 5, high: 10 });
  assert.deepEqual(result, {});
});

test('classify throws TypeError for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { low: 'not-a-number' }), TypeError);
});

// Add more tests here for other methods...
