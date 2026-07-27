import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by categories', () => {
  const inputs = [1.2, 3.4, 5.6, 0.5];
  const categories = { low: 1.0, medium: 3.0, high: 5.0 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [1.2, 3.4, 5.6], medium: [3.4, 5.6], high: [5.6] });
});

test('classify throws on invalid inputs', () => {
  assert.throws(() => perception.classify([], { low: 1.0 }), TypeError);
  assert.throws(() => perception.classify([1.0], null), TypeError);
  assert.throws(() => perception.classify([1.0], { low: 'invalid' }), TypeError);
});

