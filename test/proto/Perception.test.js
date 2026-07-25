import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify filters inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const expected = { low: [2, 3, 4, 5], high: [4, 5] };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, expected);
});

test('classify throws on empty sensory inputs', () => {
  assert.throws(() => perception.classify([], { low: 2 }), TypeError);
});

test('classify throws on invalid categories type', () => {
  assert.throws(() => perception.classify([1, 2], 'not-an-object'), TypeError);
});

test('classify throws on empty categories', () => {
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws on invalid threshold types', () => {
  const categories = { invalid: 'string' };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});

