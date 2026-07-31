import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect filters valid sensory inputs', () => {
  const inputs = [1, null, 2, undefined, 3, NaN, 4];
  const result = perception.detect(inputs);
  assert.deepEqual(result, [1, 2, 3, 4]);
});

test('detect throws TypeError for non-array input', () => {
  assert.throws(() => perception.detect(null), TypeError);
  assert.throws(() => perception.detect({}), TypeError);
});

test('detect throws TypeError for empty array', () => {
  assert.throws(() => perception.detect([]), TypeError);
});

test('filter applies predicate and returns filtered results', () => {
  const inputs = [1, 2, 3, 4];
  const predicate = (input) => input > 2;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [3, 4]);
});

test('filter throws TypeError for non-function predicate', () => {
  assert.throws(() => perception.filter([], 'not-a-function'), TypeError);
});

test('classify categorizes inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4];
  const thresholdsMap = { low: 2, high: 3 };
  const result = perception.classify(inputs, thresholdsMap);
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('classify throws TypeError for invalid thresholdsMap', () => {
  assert.throws(() => perception.classify([], {}), TypeError);
});
