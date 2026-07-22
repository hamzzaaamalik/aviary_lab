import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by classifier', () => {
  const inputs = [1, 2, 3, 4, 5];
  const classifier = (n) => (n % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    odd: [1, 3, 5],
    even: [2, 4]
  });
});

test('classify handles invalid classifier', () => {
  assert.throws(() => perception.classify([1, 2], 'notAFunction'), TypeError);
});

test('classify throws on invalid key', () => {
  const inputs = [1, 2];
  const classifier = () => null;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify returns empty object for no inputs', () => {
  const result = perception.classify([], (n) => n);
  assert.deepEqual(result, {});
});

