import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classifyWithCounts correctly categorizes inputs with counts', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classifyWithCounts(inputs, categories);
  assert.deepEqual(result, { 
    low: { inputs: [2, 3, 4, 5], count: 4 }, 
    high: { inputs: [4, 5], count: 2 } 
  });
});

// More tests as needed...
