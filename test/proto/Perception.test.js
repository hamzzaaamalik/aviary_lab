import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method filters sensory inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (x) => x > 2;
  const result = perception.detect(inputs, predicate);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect method throws on invalid input', () => {
  assert.throws(() => perception.detect(null, () => true), TypeError);
  assert.throws(() => perception.detect([], null), TypeError);
});

test('filter method filters sensory inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const criteria = (x) => x % 2 === 0;
  const result = perception.filter(inputs, criteria);
  assert.deepEqual(result, [2, 4]);
});

test('filter method throws on invalid input', () => {
  assert.throws(() => perception.filter(null, () => true), TypeError);
  assert.throws(() => perception.filter([], null), TypeError);
});

test('classify method classifies sensory inputs correctly', () => {
  const inputs = ['apple', 'banana', 'carrot', 'date'];
  const classifier = (input) => input[0];
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, { a: ['apple'], b: ['banana'], c: ['carrot'], d: ['date'] });
});

test('classify method throws on invalid input', () => {
  assert.throws(() => perception.classify(null, () => 'key'), TypeError);
  assert.throws(() => perception.classify([], null), TypeError);
});
