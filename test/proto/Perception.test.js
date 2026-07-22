import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by classifier', () => {
  const inputs = [1, 2, 3, 4, 5];
  const classifier = (num) => (num % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    even: [2, 4],
    odd: [1, 3, 5]
  });
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify(null, () => {}), TypeError);
  assert.throws(() => perception.classify([], 'not-a-function'), TypeError);
});

test('classify throws on invalid classifier return', () => {
  const inputs = [1, 2, 3];
  const classifier = () => null;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

