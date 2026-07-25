import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize with includeEmpty=true returns empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = { high: 2, low: 0 };
  const result = perception.categorize(inputs, categories, true);
  assert.deepEqual(result, { high: [2, 3], low: [1, 2, 3] });
});

test('categorize without includeEmpty excludes empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = { high: 4, low: 0 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3] });
});

test('categorize throws on invalid input', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([], null), TypeError);
  assert.throws(() => perception.categorize([], { valid: 'not a number' }), TypeError);
});

test('categorize handles empty inputs', () => {
  const inputs = [];
  const categories = { empty: 0 };
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, {});
});

test('categorize handles no categories', () => {
  const inputs = [1, 2, 3];
  const result = perception.categorize(inputs, {});
  assert.deepEqual(result, {});
});
