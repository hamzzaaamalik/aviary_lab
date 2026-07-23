import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles empty inputs gracefully', () => {
  const result = perception.classifyWithEdgeCases([], { categoryA: 5 });
  assert.deepEqual(result, {});
});

test('classify handles invalid categories', () => {
  assert.throws(() => {
    perception.classifyWithEdgeCases([10, 20, 30], null);
  }, TypeError);
});

test('classify returns expected categories', () => {
  const inputs = [10, 20, 30, 5];
  const categories = { categoryA: 10, categoryB: 25 };
  const result = perception.classifyWithEdgeCases(inputs, categories);
  assert.deepEqual(result, { categoryA: [10, 20, 30], categoryB: [30] });
});

