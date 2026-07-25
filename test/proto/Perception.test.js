import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method identifies noise correctly', () => {
  const result = perception.detect([0, 5, 10, 15], 10);
  assert.deepEqual(result, [10, 15]);
});

test('detect method handles empty input', () => {
  const result = perception.detect([], 10);
  assert.deepEqual(result, []);
});


test('filter method works with valid predicate', () => {
  const result = perception.filter([1, 2, 3, 4], n => n > 2);
  assert.deepEqual(result, [3, 4]);
});


test('filter method handles empty input', () => {
  const result = perception.filter([], n => n > 2);
  assert.deepEqual(result, []);
});


test('classify method classifies inputs correctly', () => {
  const categories = { high: 10, low: 5 };
  const result = perception.classify([0, 5, 10, 15], categories);
  assert.deepEqual(result, { high: [10, 15], low: [5, 10, 15] });
});


test('classify method throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], 'not an object'), TypeError);
});

test('categorize method categorizes inputs correctly', () => {
  const categories = { high: 10, low: 5 };
  const result = perception.categorize([0, 5, 10, 15], categories);
  assert.deepEqual(result, { high: [10, 15], low: [5, 10, 15] });
});

test('categorize method includes empty categories when specified', () => {
  const categories = { high: 10, low: 5, empty: 20 };
  const result = perception.categorize([0, 5, 10, 15], categories, true);
  assert.deepEqual(result, { high: [10, 15], low: [5, 10, 15], empty: [] });
});

test('categorize method throws on invalid categories', () => {
  assert.throws(() => perception.categorize([1, 2], 'not an object'), TypeError);
});
