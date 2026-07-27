import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method returns inputs above the threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect method throws on invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', 3), TypeError);
});

test('filter method applies condition function', () => {
  const inputs = [1, 2, 3, 4, 5];
  const condition = (input) => input % 2 === 0;
  const result = perception.filter(inputs, condition);
  assert.deepEqual(result, [2, 4]);
});

test('filter method throws on invalid condition', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});

test('classify method categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});
