import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 5, 10, 15, 20];
  const categories = { low: 5, medium: 10, high: 15 };
  const expected = {
    low: [5, 10, 15, 20],
    medium: [10, 15, 20],
    high: [15, 20],
  };
  assert.deepEqual(perception.classify(inputs, categories), expected);
});

test('classify throws for invalid inputs', () => {
  assert.throws(() => perception.classify([], {}), TypeError);
  assert.throws(() => perception.classify([1, 2], 'not an object'), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classifyWithCounts correctly categorizes inputs with counts', () => {
  const inputs = [1, 5, 10, 15, 20];
  const categories = { low: 5, medium: 10, high: 15 };
  const expected = {
    low: { inputs: [5, 10, 15, 20], count: 4 },
    medium: { inputs: [10, 15, 20], count: 3 },
    high: { inputs: [15, 20], count: 2 },
  };
  assert.deepEqual(perception.classifyWithCounts(inputs, categories), expected);
});

