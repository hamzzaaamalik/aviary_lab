import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by categories', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 1, medium: 3, high: 5 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [1, 2, 3, 4, 5],
    medium: [3, 4, 5],
    high: [5],
  });
});

test('classify excludes empty categories when specified', () => {
  const inputs = [1, 2, 3];
  const categories = { low: 1, high: 10 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1, 2, 3] });
});

test('classify throws on invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, { valid: 'notANumber' }), TypeError);
});

