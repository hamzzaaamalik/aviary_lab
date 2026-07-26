import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40]
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('detect detects noise correctly', () => {
  const inputs = [1, 5, 10, 15];
  const threshold = 5;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [5, 10, 15]);
});

test('filter filters inputs correctly', () => {
  const inputs = [1, 2, 3, 4];
  const predicate = x => x > 2;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [3, 4]);
});

test('detect throws on invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', 5), TypeError);
});

test('filter throws on invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});
