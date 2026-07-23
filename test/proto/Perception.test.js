import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = {
    low: 2,
    medium: 4,
    high: 6
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3, 4, 5],
    medium: [4, 5]
  });
});

test('classify excludes empty categories when not included', () => {
  const inputs = [1, 2, 3];
  const categories = {
    low: 2,
    high: 5
  };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [2, 3]
  });
});

test('classify includes empty categories when included', () => {
  const inputs = [1, 2, 3];
  const categories = {
    low: 2,
    high: 5
  };
  const result = perception.classify(inputs, categories, true);
  assert.deepEqual(result, {
    low: [2, 3],
    high: []
  });
});

test('classify throws on invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify('not an array', {}), TypeError);
});

