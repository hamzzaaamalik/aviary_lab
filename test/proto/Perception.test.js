import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect() detects inputs above threshold', () => {
  const inputs = [1, 2, 3, 4];
  const threshold = 2;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [2, 3, 4]);
});

test('detect() handles empty input', () => {
  const result = perception.detect([], 2);
  assert.deepEqual(result, []);
});

test('detect() throws on invalid threshold', () => {
  assert.throws(() => perception.detect([1, 2], 'invalid'), TypeError);
});

test('filter() filters inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4];
  const predicate = (input) => input % 2 === 0;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [2, 4]);
});

test('filter() handles empty input', () => {
  const result = perception.filter([], () => true);
  assert.deepEqual(result, []);
});

test('filter() throws on invalid predicate', () => {
  assert.throws(() => perception.filter([1, 2], 'not a function'), TypeError);
});

test('classify() classifies inputs correctly', () => {
  const inputs = [1, 2, 3, 4];
  const categories = { low: 2, high: 3 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('classify() throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 2 }), TypeError);
});

test('classify() throws on invalid categories', () => {
  assert.throws(() => perception.classify([1, 2], 'not an object'), TypeError);
});

test('classify() throws on invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2], { low: 'invalid' }), TypeError);
});
