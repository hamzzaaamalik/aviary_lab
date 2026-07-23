import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify with valid inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify includes empty categories if specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 10, high: 2 };
  const result = perception.classify(inputs, categories, true);
  assert.deepEqual(result, { low: [], high: [2, 3] });
});

test('classify excludes empty categories if not specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 10, high: 2 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { high: [2, 3] });
});

test('classify throws on invalid categories input', () => {
  assert.throws(() => perception.classify([1, 2], 'invalid'), TypeError);
});

test('classify throws on invalid threshold', () => {
  const categories = { low: 'invalid' };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});

test('classify throws on invalid sensory inputs', () => {
  const categories = { low: 1 };
  assert.throws(() => perception.classify('invalid', categories), TypeError);
});
