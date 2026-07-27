import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect filters inputs above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.detect(inputs, 3);
  assert.deepEqual(result, [4, 5]);
});

test('detect throws for invalid threshold', () => {
  assert.throws(() => perception.detect([1, 2, 3], 'not-a-number'), TypeError);
});

test('filter applies predicate correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.filter(inputs, x => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('filter throws for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not-a-function'), TypeError);
});

test('classify works as expected', () => {
  const inputs = [1, 2, 3, 4, 5];
  const thresholds = { low: 2, high: 4 };
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});
