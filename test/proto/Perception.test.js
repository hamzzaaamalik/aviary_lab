import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classifyWithUniqueKeys handles duplicates', () => {
  const inputs = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 1 }, // Duplicate key
  ];
  const classifier = (input) => input.value.toString();
  assert.throws(() => perception.classifyWithUniqueKeys(inputs, classifier), TypeError);
});

test('classifyWithUniqueKeys classifies inputs correctly', () => {
  const inputs = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
  ];
  const classifier = (input) => input.value.toString();
  const result = perception.classifyWithUniqueKeys(inputs, classifier);
  assert.deepEqual(result, {
    '1': [{ value: 1 }],
    '2': [{ value: 2 }],
    '3': [{ value: 3 }],
  });
});

