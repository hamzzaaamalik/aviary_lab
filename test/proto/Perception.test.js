import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classifyWithCounts classifies inputs with counts', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classifyWithCounts(inputs, categories);
  assert.deepEqual(result, {
    low: { inputs: [2, 3, 4, 5], count: 4 },
    high: { inputs: [4, 5], count: 2 }
  });
});

test('classifyWithCounts throws on empty inputs', () => {
  assert.throws(() => perception.classifyWithCounts([], { low: 1 }), TypeError);
});

test('classifyWithCounts throws on invalid categories', () => {
  assert.throws(() => perception.classifyWithCounts([1], 'invalid'), TypeError);
});

test('classifyWithCounts throws on empty categories', () => {
  assert.throws(() => perception.classifyWithCounts([1], {}), TypeError);
});

test('classifyWithCounts throws on invalid threshold', () => {
  assert.throws(() => perception.classifyWithCounts([1], { low: 'invalid' }), TypeError);
});
