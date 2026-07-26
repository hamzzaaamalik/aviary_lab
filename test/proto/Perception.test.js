import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles thresholds below inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const expected = {
    low: [2, 3, 4, 5],
    high: [4, 5],
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, expected);
});

// Additional tests for validateInputs, validateThresholds, detect, and filter methods

