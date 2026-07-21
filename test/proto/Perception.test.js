import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles empty input', () => {
  const result = perception.classify([], input => input);
  assert.deepEqual(result, {});
});

test('classify throws on non-function classifier', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not-a-function'), TypeError);
});

test('classify works with valid inputs', () => {
  const result = perception.classify([1, 2, 3, 1], input => input.toString());
  assert.deepEqual(result, { '1': [1, 1], '2': [2], '3': [3] });
});
