import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method identifies noise correctly', () => {
  const inputs = [0, 1, 2, 3, 4];
  const threshold = 2;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [2, 3, 4]);
});

test('filter method applies predicate correctly', () => {
  const inputs = [1, 2, 3, 4];
  const predicate = (x) => x > 2;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [3, 4]);
});

test('classify method categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4];
  const categories = { low: 2, high: 3 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('detect throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect('invalid', 1), TypeError);
});

test('filter throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'not a function'), TypeError);
});

test('classify throws TypeError for invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
});
