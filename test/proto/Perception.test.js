import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs correctly', () => {
  const inputs = ['apple', 'banana', 'apricot', 'blueberry'];
  const classifier = (input) => input[0]; // Group by first letter
  const classified = perception.classify(inputs, classifier);
  assert.deepEqual(classified, {
    a: ['apple', 'apricot'],
    b: ['banana', 'blueberry'],
  });
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify('not an array', () => {}), TypeError);
});

test('classify throws on non-function classifier', () => {
  assert.throws(() => perception.classify(['input'], 'not a function'), TypeError);
});

test('classify handles undefined classifier return', () => {
  const inputs = ['apple', 'banana'];
  const classifier = () => undefined;
  const classified = perception.classify(inputs, classifier);
  assert.deepEqual(classified, {});
});
