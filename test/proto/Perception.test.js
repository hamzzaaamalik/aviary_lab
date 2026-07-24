import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize correctly categorizes sensory inputs', () => {
  const sensoryInputs = [10, 20, 30, 40, 50];
  const categories = { low: 15, medium: 35, high: 45 };
  const result = perception.categorize(sensoryInputs, categories);
  assert.deepEqual(result, { low: [20, 30, 40, 50], medium: [40, 50], high: [50] });
});

test('categorize includes empty categories when specified', () => {
  const sensoryInputs = [10, 20, 30];
  const categories = { low: 15, medium: 35, high: 45 };
  const result = perception.categorize(sensoryInputs, categories, true);
  assert.deepEqual(result, { low: [20, 30], medium: [], high: [] });
});

test('categorize throws on invalid categories', () => {
  assert.throws(() => perception.categorize([10, 20], 'not an object'), TypeError);
});

test('categorize throws on invalid sensory inputs', () => {
  assert.throws(() => perception.categorize('not an array', { low: 15 }), TypeError);
});
