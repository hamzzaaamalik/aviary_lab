import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize groups sensory inputs by categories', () => {
  const inputs = [10, 20, 30, 40, 50];
  const categories = { low: 0, medium: 25, high: 40 };
  const expected = { low: [10, 20, 30, 40, 50], medium: [30, 40, 50], high: [40, 50] };
  assert.deepEqual(perception.categorize(inputs, categories), expected);
});

test('categorize includes empty categories when specified', () => {
  const inputs = [10, 20];
  const categories = { low: 0, medium: 30 };
  const expected = { low: [10, 20], medium: [] };
  assert.deepEqual(perception.categorize(inputs, categories), expected);
});

test('categorize throws for invalid input', () => {
  assert.throws(() => perception.categorize('not an array', {}), TypeError);
  assert.throws(() => perception.categorize([], 'not an object'), TypeError);
});

test('categorize throws for non-numeric thresholds', () => {
  const inputs = [10, 20];
  const categories = { low: 0, medium: 'not a number' };
  assert.throws(() => perception.categorize(inputs, categories), TypeError);
});

test('categorize handles empty inputs gracefully', () => {
  const inputs = [];
  const categories = { low: 0, medium: 25 };
  const expected = { low: [], medium: [] };
  assert.deepEqual(perception.categorize(inputs, categories), expected);
});
