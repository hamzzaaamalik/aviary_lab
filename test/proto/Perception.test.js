import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly classifies sensory inputs', () => {
  const inputs = [10, 20, 30, 5];
  const categories = { high: 15, low: 5 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { high: [20, 30], low: [10, 20, 30, 5] });
});

test('classify throws on empty inputs', () => {
  const inputs = [];
  const categories = { high: 15 };
  assert.throws(() => perception.classify(inputs, categories), TypeError, 'Sensory inputs cannot be empty.');
});

test('classify throws on invalid categories type', () => {
  const inputs = [10];
  const categories = null;
  assert.throws(() => perception.classify(inputs, categories), TypeError, 'Categories must be an object.');
});

test('classify throws on empty categories', () => {
  const inputs = [10];
  const categories = {};
  assert.throws(() => perception.classify(inputs, categories), TypeError, 'Categories cannot be an empty object.');
});

test('classify throws on invalid thresholds', () => {
  const inputs = [10];
  const categories = { high: 'invalid' };
  assert.throws(() => perception.classify(inputs, categories), TypeError, 'Threshold for high must be a finite number.');
});
