import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { valid: NaN }), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { valid: Infinity }), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { valid: 'string' }), TypeError);
});

test('classify works with valid thresholds', () => {
  const result = perception.classify([1, 2, 3, 4], { low: 2, high: 3 });
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

// Additional tests for detect and filter can go here
