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
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, { low: 'two' }), TypeError);
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify returns empty object for no inputs', () => {
  const thresholds = { low: 2 };
  const result = perception.classify([], thresholds);
  assert.deepEqual(result, {});
});

test('classify throws on empty thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('checkInputs throws on invalid input array', () => {
  assert.throws(() => perception.detect('not an array'), TypeError);
  assert.throws(() => perception.detect([1, null, 3]), TypeError);
});
