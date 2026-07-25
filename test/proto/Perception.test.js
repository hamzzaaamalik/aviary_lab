import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method detects noise correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [3, 4, 5]);
});

test('detect method returns empty array for no input above threshold', () => {
  const inputs = [1, 2];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, []);
});

test('detect method throws TypeError for invalid threshold', () => {
  assert.throws(() => perception.detect([1, 2, 3], 'invalid'), TypeError);
});

test('filter method filters inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (input) => input > 2;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [3, 4, 5]);
});

test('filter method returns empty array for no inputs', () => {
  const result = perception.filter([], () => true);
  assert.deepEqual(result, []);
});

test('filter method throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2], 'invalid'), TypeError);
});

test('classify method classifies inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classify method throws TypeError for empty inputs', () => {
  const categories = { low: 2 };
  assert.throws(() => perception.classify([], categories), TypeError);
});

test('classify method throws TypeError for invalid categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, 'invalid'), TypeError);
});

test('classify method throws TypeError for empty categories', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});
