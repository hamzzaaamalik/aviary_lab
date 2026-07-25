import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Test cases for classify method

test('classify groups inputs by categories', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40]
  });
});

// Test cases for empty inputs

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 15 }), TypeError);
});

// Test cases for invalid categories

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([10], 'not-an-object'), TypeError);
  assert.throws(() => perception.classify([10], {}), TypeError);
});

// Test cases for finite number thresholds

test('classify throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([10], { low: 'string' }), TypeError);
});

// Test cases for valid inputs

test('classify works with valid inputs', () => {
  const inputs = [5, 15, 25, 35];
  const categories = { low: 10, high: 30 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [15, 25, 35],
    high: [35]
  });
});

