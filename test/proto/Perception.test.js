import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify: valid input', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const expected = { low: [2, 3, 4, 5], high: [4, 5] };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, expected);
});

test('classify: empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 5 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {});
});

test('classify: include empty categories', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 0, high: 5 };
  const result = perception.classify(inputs, categories, true);
  assert.deepEqual(result, { low: [1, 2, 3], high: [] });
});

test('classify: throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], 'invalid'), TypeError);
});

test('classify: throws on invalid threshold', () => {
  const categories = { low: 'invalid' };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});
