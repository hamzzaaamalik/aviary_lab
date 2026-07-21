import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by classifier function', () => {
  const inputs = [1, 2, 3, 4, 5];
  const classifier = (n) => (n % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    odd: [1, 3, 5],
    even: [2, 4]
  });
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify('not an array', () => {}), TypeError);
  assert.throws(() => perception.classify([], 'not a function'), TypeError);
});

test('classify warns on undefined classifier return', () => {
  const inputs = [1, 2, 3];
  const consoleWarn = console.warn;
  let warned = false;
  console.warn = () => { warned = true; };
  perception.classify(inputs, () => undefined);
  assert.equal(warned, true);
  console.warn = consoleWarn;
});

