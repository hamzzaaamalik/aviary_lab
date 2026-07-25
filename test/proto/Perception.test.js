import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classifyWithCounts classifies inputs and counts them', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classifyWithCounts(inputs, categories);
  assert.deepEqual(result, {
    low: { count: 4, inputs: [2, 3, 4, 5] },
    high: { count: 2, inputs: [4, 5] }
  });
});

test('classifyWithCounts throws on invalid inputs', () => {
  assert.throws(() => perception.classifyWithCounts([], { low: 1 }), TypeError);
  assert.throws(() => perception.classifyWithCounts([1, 2], null), TypeError);
  assert.throws(() => perception.classifyWithCounts([1, 2], {}), TypeError);
  assert.throws(() => perception.classifyWithCounts([1, 2], { low: 'a' }), TypeError);
});

