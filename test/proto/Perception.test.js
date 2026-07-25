import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify groups inputs into categories', () => {
  const inputs = [1, 5, 10, 15];
  const categories = { low: 5, high: 10 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [5, 10, 15], high: [10, 15] });
});

test('classify throws on invalid categories', () => {
  const inputs = [1, 5, 10];
  assert.throws(() => perception.classify(inputs, null), TypeError);
  assert.throws(() => perception.classify(inputs, {}), TypeError);
  assert.throws(() => perception.classify(inputs, { low: 'not-a-number' }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: Infinity }), TypeError);
  assert.throws(() => perception.classify(inputs, { low: NaN }), TypeError);
});

test('classify throws on empty inputs', () => {
  const categories = { low: 5 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

