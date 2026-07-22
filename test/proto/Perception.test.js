import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by classifier function', () => {
  const inputs = [1, 2, 3, 4];
  const classifier = (n) => (n % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    even: [2, 4],
    odd: [1, 3],
  });
});

test('classify handles empty array', () => {
  const result = perception.classify([], () => 'test');
  assert.deepEqual(result, {});
});

test('classify throws on invalid key', () => {
  const inputs = [1, 2, 3];
  const classifier = () => null;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify throws on non-function classifier', () => {
  assert.throws(() => perception.classify([1], 'not-a-function'), TypeError);
});
