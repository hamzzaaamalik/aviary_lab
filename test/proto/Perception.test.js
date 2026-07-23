import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify includes empty categories when specified', () => {
  const inputs = [10, 20, 30];
  const categories = { high: 15, low: 5, none: 50 };
  const result = perception.classify(inputs, categories, true);
  assert.deepEqual(result, {
    high: [20, 30],
    low: [10, 20, 30],
    none: []
  });
});

test('classify excludes empty categories when not specified', () => {
  const inputs = [10, 20, 30];
  const categories = { high: 15, low: 5, none: 50 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    high: [20, 30],
    low: [10, 20, 30]
  });
});

// Additional tests for detect and filter can go here.