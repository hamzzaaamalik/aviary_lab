import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by classifier function', () => {
  const inputs = [1, 2, 3, 4, 5];
  const classifier = (x) => (x % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    odd: [1, 3, 5],
    even: [2, 4]
  });
});

test('classify throws TypeError on invalid classifier', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not a function'), TypeError);
});

test('classify throws TypeError on invalid inputs', () => {
  assert.throws(() => perception.classify('not an array', (x) => x), TypeError);
});

test('classify handles empty input array', () => {
  const result = perception.classify([], (x) => x);
  assert.deepEqual(result, {});
});

test('classify throws TypeError for invalid key', () => {
  const inputs = [1, 2, 3];
  const classifier = (x) => null; // invalid classifier
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});
