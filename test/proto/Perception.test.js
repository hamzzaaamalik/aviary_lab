import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns matching sensory inputs', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.detect(inputs, (x) => x > 2);
  assert.deepEqual(result, [3, 4]);
});

test('detect throws on invalid predicate', () => {
  assert.throws(() => perception.detect([1, 2], 'not a function'), TypeError);
});

test('filter returns filtered sensory inputs', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.filter(inputs, (x) => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('filter throws on invalid criteria', () => {
  assert.throws(() => perception.filter([1, 2], 'not a function'), TypeError);
});

test('classify groups inputs by classifier function', () => {
  const inputs = ['apple', 'banana', 'cherry', 'avocado'];
  const result = perception.classify(inputs, (fruit) => fruit[0]);
  assert.deepEqual(result, {
    a: ['apple', 'avocado'],
    b: ['banana'],
    c: ['cherry']
  });
});

test('classify throws on invalid classifier', () => {
  assert.throws(() => perception.classify(['a', 'b'], 'not a function'), TypeError);
});

test('classify throws on undefined classifier return', () => {
  assert.throws(() => perception.classify(['a', 'b'], () => undefined), TypeError);
});

test('classify throws on non-string classifier return', () => {
  assert.throws(() => perception.classify(['a', 'b'], () => 1), TypeError);
});
