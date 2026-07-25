import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups inputs by category thresholds', () => {
  const inputs = [10, 20, 30, 40, 50];
  const categories = { low: 0, medium: 30, high: 40 };  
  const result = perception.categorize(inputs, categories);
  assert.deepEqual(result, { low: [10, 20, 30, 40, 50], medium: [30, 40, 50], high: [40, 50] });
});

test('categorize throws on empty inputs', () => {
  const categories = { low: 0 };
  assert.throws(() => perception.categorize([], categories), TypeError);
});

test('categorize throws on invalid categories', () => {
  const inputs = [10, 20];
  assert.throws(() => perception.categorize(inputs, null), TypeError);
  assert.throws(() => perception.categorize(inputs, {}), TypeError);
});

test('categorize throws on non-finite thresholds', () => {
  const inputs = [10, 20];
  const categories = { low: Infinity };
  assert.throws(() => perception.categorize(inputs, categories), TypeError);
});

