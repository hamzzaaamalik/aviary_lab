import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups sensory inputs into categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 2,
    high: 4,
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    high: [4, 5],
  });
});

test('classify handles empty categories correctly', () => {
  const inputs = [1, 2, 3];
  const categories = {
    low: 2,
    high: 5,
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3] });
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], 'not-an-object'), TypeError);
});

test('classify throws on invalid threshold', () => {
  const categories = { low: 'not-a-number' };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});

test('classify includes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = {
    low: 2,
    high: 5,
  };
  const result = perception.classify(inputs, categories, true);
  assert.deepEqual(result, { low: [2, 3], high: [] });
});
