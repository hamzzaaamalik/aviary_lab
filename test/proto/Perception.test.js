import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles empty input', () => {
  const result = perception.classify([], (x) => x);
  assert.deepEqual(result, {});
});

test('classify throws on invalid key', () => {
  assert.throws(() => {
    perception.classify([1, 2, 3], () => null);
  }, TypeError);
});

test('classify groups inputs by classifier', () => {
  const inputs = [1, 2, 3, 4];
  const classifier = (x) => (x % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    odd: [1, 3],
    even: [2, 4]
  });
});

test('classify throws on non-function classifier', () => {
  assert.throws(() => {
    perception.classify([1, 2], 'not-a-function');
  }, TypeError);
});
