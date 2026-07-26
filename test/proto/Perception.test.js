import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests... 

test('classify throws on empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { category1: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not an object'), TypeError);
});

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify returns empty categories when thresholds are not met', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [] });
});

// Additional edge case tests... 
