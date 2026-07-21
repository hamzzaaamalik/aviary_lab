import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs by classifier function', () => {
  const inputs = [1, 2, 3, 'cat', 'dog'];
  const classifier = (input) => typeof input === 'number' ? 'number' : 'string';
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    number: [1, 2, 3],
    string: ['cat', 'dog']
  });
});

test('classify throws error for non-array input', () => {
  assert.throws(() => perception.classify('not an array', (x) => x), TypeError);
});

test('classify throws error for non-function classifier', () => {
  assert.throws(() => perception.classify([1, 2], 'not a function'), TypeError);
});

test('classify warns on undefined or null keys', () => {
  const inputs = [1, 2, 3];
  const classifier = () => undefined;
  const consoleWarn = console.warn;
  let warned = false;
  console.warn = () => { warned = true; };
  perception.classify(inputs, classifier);
  console.warn = consoleWarn;
  assert.ok(warned);
});

