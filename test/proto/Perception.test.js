import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups sensory inputs into categories', () => {
  const inputs = [5, 10, 15, 20];
  const categories = {
    low: () => 10,
    high: () => 15
  };
  const categorized = perception.categorize(inputs, categories);
  assert.deepEqual(categorized, {
    low: [10, 15, 20],
    high: [15, 20]
  });
});

test('categorize returns empty object for empty inputs', () => {
  const inputs = [];
  const categories = {
    low: () => 10
  };
  const categorized = perception.categorize(inputs, categories);
  assert.deepEqual(categorized, {});
});

test('categorize throws error for invalid categories', () => {
  const inputs = [5, 10, 15, 20];
  assert.throws(() => perception.categorize(inputs, null), TypeError);
  assert.throws(() => perception.categorize(inputs, {}), TypeError);
});

test('categorize throws error for empty categories', () => {
  const inputs = [5, 10, 15, 20];
  const categories = {};
  assert.throws(() => perception.categorize(inputs, categories), TypeError);
});

test('categorize handles non-function thresholds', () => {
  const inputs = [5, 10, 15, 20];
  const categories = {
    low: () => 10,
    invalid: 'not a function'
  };
  assert.throws(() => perception.categorize(inputs, categories), TypeError);
});

