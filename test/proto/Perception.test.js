import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes sensory inputs', () => {
  const inputs = [10, 20, 30, 40];
  const categories = { low: 15, medium: 25, high: 35 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, {
    low: [20, 30, 40],
    medium: [30, 40],
    high: [40]
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 1 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws on undefined categories', () => {
  assert.throws(() => perception.classify([1, 2], undefined), TypeError);
});

test('classify throws on empty categories', () => {
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws on invalid threshold', () => {
  assert.throws(() => perception.classify([1, 2], { low: 'notANumber' }), TypeError);
});

