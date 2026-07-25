import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classifyWithCounts classifies inputs by categories and counts them', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.classifyWithCounts(inputs, categories);
  assert.deepEqual(result, { low: 5, medium: 3, high: 1 });
});

test('classifyWithCounts throws on invalid inputs', () => {
  const categories = { low: 1 };
  assert.throws(() => perception.classifyWithCounts([], categories), TypeError);
  assert.throws(() => perception.classifyWithCounts([1, 2], null), TypeError);
  assert.throws(() => perception.classifyWithCounts([1, 2], {}), TypeError);
  assert.throws(() => perception.classifyWithCounts([1, 2], { low: 'a' }), TypeError);
});

test('detect filters sensory inputs based on threshold', () => {
  const inputs = [0, 1, 2, 3];
  const threshold = 2;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [2, 3]);
});

test('filter applies predicate function to sensory inputs', () => {
  const inputs = [1, 2, 3, 4];
  const predicate = input => input > 2;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [3, 4]);
});
