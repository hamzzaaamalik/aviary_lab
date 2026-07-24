import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize handles empty input', () => {
  const result = perception.categorize([], { high: 5, low: 1 }, true);
  assert.deepEqual(result, { high: [], low: [] });
});

test('categorize includes empty categories when specified', () => {
  const result = perception.categorize([1, 2, 3], { high: 5, low: 1 }, true);
  assert.deepEqual(result, { high: [], low: [1, 2, 3] });
});

test('categorize does not include empty categories when not specified', () => {
  const result = perception.categorize([1, 2, 3], { high: 5, low: 1 });
  assert.deepEqual(result, { low: [1, 2, 3] });
});

test('categorize throws on invalid categories object', () => {
  assert.throws(() => perception.categorize([1, 2], 'invalid'), TypeError);
});

test('categorize throws on invalid threshold', () => {
  assert.throws(() => perception.categorize([1, 2], { high: 'invalid' }), TypeError);
});

// Additional tests for categorize method to cover edge cases
