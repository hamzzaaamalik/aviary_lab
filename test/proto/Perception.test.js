import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by classifier function', () => {
  const inputs = [1, 2, 'a', 'b', 3];
  const classifier = (input) => (typeof input === 'number' ? 'number' : 'string');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    number: [1, 2, 3],
    string: ['a', 'b'],
  });
});

test('classify handles undefined classifier return values', () => {
  const inputs = [1, 2, 3];
  const classifier = () => undefined;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {});
});

test('classify throws on non-function classifier', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, 'not-a-function'), TypeError);
});

