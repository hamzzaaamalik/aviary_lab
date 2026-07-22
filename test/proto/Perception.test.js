import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by classifier', () => {
  const inputs = ['apple', 'banana', 'carrot', 'apricot'];
  const classifier = (input) => input[0]; // classify by first letter
  const classified = perception.classify(inputs, classifier);
  assert.deepEqual(classified, {
    a: ['apple', 'apricot'],
    b: ['banana'],
    c: ['carrot'],
  });
});

test('classify throws on invalid input', () => {
  assert.throws(() => perception.classify(null, (x) => x), TypeError);
  assert.throws(() => perception.classify(['x'], null), TypeError);
});

test('classify throws on undefined classifier return', () => {
  const inputs = ['apple', 'banana'];
  const classifier = () => undefined;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

