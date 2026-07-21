import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns matching sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const condition = (input) => input > 2;
  const result = perception.detect(inputs, condition);
  assert.deepEqual(result, [3, 4, 5]);
});

test('filter returns filtered sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const criteria = (input) => input % 2 === 0;
  const result = perception.filter(inputs, criteria);
  assert.deepEqual(result, [2, 4]);
});

test('classify groups sensory inputs by classifier', () => {
  const inputs = ['apple', 'banana', 'carrot', 'apple'];
  const classifier = (input) => input[0];
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, { a: ['apple', 'apple'], b: ['banana'], c: ['carrot'] });
});

test('classify warns on undefined classifier return', () => {
  const inputs = [1, 2, 3];
  const classifier = () => undefined;
  const consoleWarn = console.warn;
  console.warn = () => {};  // suppress warning for test
  const result = perception.classify(inputs, classifier);
  console.warn = consoleWarn;
  assert.deepEqual(result, {});
});

test('classify throws on non-string key', () => {
  const inputs = [1, 2, 3];
  const classifier = () => 1;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});
