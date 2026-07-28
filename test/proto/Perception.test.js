import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify categorizes inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not an object'), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { low: NaN }), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { low: Infinity }), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { }), TypeError);
});

test('classify returns empty object for no inputs', () => {
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

// Additional tests for invalid inputs
test('classify throws on invalid input types', () => {
  assert.throws(() => perception.classify('not an array', { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2, null], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2, undefined], { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2, 'string'], { low: 1 }), TypeError);
});
