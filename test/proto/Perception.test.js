import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs correctly', () => {
  const inputs = [1, 2, 2, 3, 4, 4];
  const classifier = (n) => (n % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    odd: [1, 3],
    even: [2, 2, 4, 4]
  });
});

test('classify handles empty input', () => {
  const result = perception.classify([], (n) => n);
  assert.deepEqual(result, {});
});

test('classify throws on invalid key', () => {
  const inputs = [1, 2, 3];
  const classifier = () => null;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify throws on non-function classifier', () => {
  assert.throws(() => perception.classify([1, 2], 'not a function'), TypeError);
});

