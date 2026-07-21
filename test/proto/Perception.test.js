import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs correctly', () => {
  const inputs = [1, 'a', 2, 'b', 1, 'a'];
  const classifier = (input) => (typeof input === 'number' ? 'number' : 'string');
  const classified = perception.classify(inputs, classifier);
  assert.deepEqual(classified, {
    number: [1, 2, 1],
    string: ['a', 'b', 'a'],
  });
});

test('classify handles undefined classifier return', () => {
  const inputs = [1, 2, 3];
  const classifier = () => undefined;
  const classified = perception.classify(inputs, classifier);
  assert.deepEqual(classified, {});
});

test('classify throws TypeError for non-function classifier', () => {
  assert.throws(() => perception.classify([], 'not a function'), TypeError);
});

