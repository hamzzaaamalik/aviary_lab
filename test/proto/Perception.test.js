import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by thresholds', () => {
  const inputs = [10, 20, 30, 40];
  const thresholds = { low: 15, high: 25 };
  const expected = { 15: [20, 30, 40], 25: [30, 40] };
  const classified = perception.classify(inputs, thresholds);
  assert.deepEqual(classified, expected);
});

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([10, 20], 'not-an-object'), TypeError);
  assert.throws(() => perception.classify([10, 20], { low: 'not-a-number' }), TypeError);
});

test('classify returns empty object for empty inputs', () => {
  const result = perception.classify([], { low: 5 });
  assert.deepEqual(result, {});
});

test('detect filters out null and undefined', () => {
  const inputs = [1, null, 2, undefined, 3, NaN, 4];
  const detected = perception.detect(inputs);
  assert.deepEqual(detected, [1, 2, 3, 4]); // NaN should be filtered out
});

test('filter applies predicate function', () => {
  const inputs = [1, 2, 3, 4];
  const predicate = x => x > 2;
  const filtered = perception.filter(inputs, predicate);
  assert.deepEqual(filtered, [3, 4]);
});

