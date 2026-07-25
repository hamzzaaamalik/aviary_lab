import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classifyWithCounts handles valid input', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { high: 20, low: 10 };
  const result = perception.classifyWithCounts(inputs, categories);
  assert.deepEqual(result, { 
    high: { count: 3, inputs: [20, 30, 40] },
    low: { count: 4, inputs: [10, 20, 30, 40] }
  });
});

test('classifyWithCounts throws on empty inputs', () => {
  assert.throws(() => perception.classifyWithCounts([], { high: 10 }), TypeError);
});

test('classifyWithCounts throws on non-object categories', () => {
  assert.throws(() => perception.classifyWithCounts([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classifyWithCounts([1, 2, 3], 'string'), TypeError);
});

test('classifyWithCounts throws on empty categories', () => {
  assert.throws(() => perception.classifyWithCounts([1, 2, 3], {}), TypeError);
});

test('classifyWithCounts throws on invalid threshold', () => {
  const categories = { valid: 10, invalid: NaN };
  assert.throws(() => perception.classifyWithCounts([1, 2, 3], categories), TypeError);
});
