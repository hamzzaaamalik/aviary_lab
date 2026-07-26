import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { high: 10 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([5, 15], 'not-an-object'), TypeError);
  assert.throws(() => perception.classify([5, 15], {}), TypeError);
});

test('classify works with valid categories', () => {
  const categories = { low: 5, high: 10 };
  const inputs = [1, 5, 10, 15];
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: { inputs: [5, 10, 15], count: 3 },
    high: { inputs: [10, 15], count: 2 }
  });
});

test('detect noise correctly', () => {
  const inputs = [1, 5, 10, 15];
  const result = perception.detect(inputs, 10);
  assert.deepEqual(result, [10, 15]);
});

test('filter applies predicate correctly', () => {
  const inputs = [1, 5, 10, 15];
  const result = perception.filter(inputs, x => x > 5);
  assert.deepEqual(result, [10, 15]);
});
