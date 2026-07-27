import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateInputs throws on invalid input', () => {
  assert.throws(() => perception.validateInputs('not an array'), TypeError);
  assert.throws(() => perception.validateInputs([1, 2, Infinity]), TypeError);
});

test('validateThresholds throws on invalid categories', () => {
  assert.throws(() => perception.validateThresholds(null), TypeError);
  assert.throws(() => perception.validateThresholds({}), TypeError);
  assert.throws(() => perception.validateThresholds({ a: 'not a number' }), TypeError);
});

test('detect returns detected noise inputs', () => {
  const result = perception.detect([0, 1, 2, 3, 4], 2);
  assert.deepEqual(result, [2, 3, 4]);
});

test('filter returns filtered sensory inputs', () => {
  const result = perception.filter([1, 2, 3, 4], x => x > 2);
  assert.deepEqual(result, [3, 4]);
});

test('classify returns classified sensory inputs', () => {
  const categories = { noise: 2, signal: 3 };
  const result = perception.classify([0, 1, 2, 3, 4], categories);
  assert.deepEqual(result, { noise: [2, 3, 4], signal: [3, 4] });
});

test('classify throws on empty inputs', () => {
  const categories = { noise: 2 };
  assert.throws(() => perception.classify([], categories), TypeError);
});
