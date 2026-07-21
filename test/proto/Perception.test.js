import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by classifier', () => {
  const inputs = [1, 2, 3, 4, 5];
  const classifier = (n) => (n % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    even: [2, 4],
    odd: [1, 3, 5]
  });
});

test('classify handles undefined classifier return', () => {
  const inputs = [1, 2, 3];
  const classifier = () => undefined;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {});
});

test('classify throws for non-string key', () => {
  const inputs = [1, 2, 3];
  const classifier = () => 1;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

