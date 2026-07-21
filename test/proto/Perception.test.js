import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method correctly identifies matching inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const condition = (x) => x > 3;
  const result = perception.detect(inputs, condition);
  assert.deepEqual(result, [4, 5]);
});

test('detect method throws on invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', () => true), TypeError);
  assert.throws(() => perception.detect([], 'not a function'), TypeError);
});

test('filter method correctly filters inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const criteria = (x) => x % 2 === 0;
  const result = perception.filter(inputs, criteria);
  assert.deepEqual(result, [2, 4]);
});

test('filter method throws on invalid inputs', () => {
  assert.throws(() => perception.filter('not an array', () => true), TypeError);
  assert.throws(() => perception.filter([], 'not a function'), TypeError);
});

test('classify method groups inputs by classifier', () => {
  const inputs = ['apple', 'banana', 'cherry', 'date'];
  const classifier = (fruit) => fruit[0];
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    a: ['apple'],
    b: ['banana'],
    c: ['cherry'],
    d: ['date']
  });
});

test('classify method throws on invalid inputs', () => {
  assert.throws(() => perception.classify('not an array', () => true), TypeError);
  assert.throws(() => perception.classify([], 'not a function'), TypeError);
});
