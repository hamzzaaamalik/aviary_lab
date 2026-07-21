import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by classifier function', () => {
  const inputs = [1, 2, 3, 4, 5];
  const classifier = (num) => (num % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    even: [2, 4],
    odd: [1, 3, 5],
  });
});

test('classify handles undefined classifier return', () => {
  const inputs = [1, 2, 3];
  const classifier = () => undefined;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {});
});

test('classify throws if classifier is not a function', () => {
  assert.throws(() => perception.classify([1, 2], 'not a function'), TypeError);
});

test('classify throws if input is not an array', () => {
  assert.throws(() => perception.classify('not an array', (x) => x), TypeError);
});

