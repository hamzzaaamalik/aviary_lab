import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups inputs into categories', () => {
  const inputs = [10, 20, 30, 5];
  const categories = {
    high: 15,
    medium: 10,
    low: 5
  };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {
    high: [20, 30],
    medium: [10, 20, 30],
    low: [10, 20, 30, 5]
  });
});

// Test for empty input

test('categorize handles empty input', () => {
  const inputs = [];
  const categories = {
    high: 15,
    medium: 10,
    low: 5
  };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {});
});

// Test for undefined input

test('categorize handles undefined input', () => {
  assert.throws(() => {
    perception.categorize(undefined, {});
  }, TypeError);
});

// Test for invalid categories

test('categorize throws for invalid categories', () => {
  const inputs = [10, 20];
  assert.throws(() => {
    perception.categorize(inputs, 'not-an-object');
  }, TypeError);
});

// Test for invalid thresholds

test('categorize throws for invalid threshold values', () => {
  const inputs = [10, 20];
  const categories = {
    high: 'not-a-number',
    medium: 10
  };
  assert.throws(() => {
    perception.categorize(inputs, categories);
  }, TypeError);
});

// Test for no categorization

test('categorize returns empty object for no categorization', () => {
  const inputs = [1, 2, 3];
  const categories = {
    high: 4,
    medium: 5,
    low: 6
  };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {});
});
