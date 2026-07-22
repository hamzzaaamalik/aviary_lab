import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classifyWithUniqueKeys classifies inputs correctly', () => {
  const inputs = [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' },
    { type: 'vegetable', name: 'carrot' },
  ];
  const classifier = input => input.type;
  const result = perception.classify(inputs, classifier);

  assert.deepEqual(result, {
    fruit: [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' },
    ],
    vegetable: [
      { type: 'vegetable', name: 'carrot' },
    ],
  });
});

// Add more tests as needed
