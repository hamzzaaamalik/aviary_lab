import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs into categories', () => {
  const inputs = [10, 20, 30, 5];
  const categories = {
    high: 15,
    medium: 10,
    low: 5
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    high: [20, 30],
    medium: [10, 20, 30],
    low: [10, 20, 30, 5]
  });
});

// Test for empty input

test('classify handles empty input', () => {
  const inputs = [];
  const categories = {
    high: 15,
    medium: 10,
    low: 5
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {});
});

// Test for invalid categories

test('classify throws for invalid categories', () => {
  const inputs = [10, 20];
  assert.throws(() => {
    perception.classify(inputs, 'not-an-object');
  }, TypeError);
});

// Test for invalid thresholds

test('classify throws for invalid threshold values', () => {
  const inputs = [10, 20];
  const categories = {
    high: 'not-a-number',
    medium: 10
  };
  assert.throws(() => {
    perception.classify(inputs, categories);
  }, TypeError);
});
