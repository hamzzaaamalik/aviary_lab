import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect filters inputs above threshold', () => {
  const result = perception.detect([1, 2, 3, 4], 2);
  assert.deepEqual(result, [2, 3, 4]);
});

test('detect returns empty array for no inputs', () => {
  const result = perception.detect([], 2);
  assert.deepEqual(result, []);
});

test('detect throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect(null, 2), TypeError);
  assert.throws(() => perception.detect([1, 2, 3], 'not a number'), TypeError);
});

test('filter applies predicate', () => {
  const result = perception.filter([1, 2, 3, 4], x => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('filter throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.filter(null, x => x), TypeError);
  assert.throws(() => perception.filter([1, 2], 'not a function'), TypeError);
});

test('classify groups inputs by categories', () => {
  const result = perception.classify([1, 2, 3, 4], { low: 2, high: 3 });
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('classify throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.classify(null, {}), TypeError);
  assert.throws(() => perception.classify([1, 2], 'not an object'), TypeError);
});

test('categorize groups inputs by categories', () => {
  const result = perception.categorize([1, 2, 3, 4], { low: 2, high: 3 });
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('categorize includes empty categories when specified', () => {
  const result = perception.categorize([1, 2, 3, 4], { low: 5, high: 3 }, true);
  assert.deepEqual(result, { low: [], high: [3, 4] });
});

test('categorize throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.categorize(null, {}), TypeError);
  assert.throws(() => perception.categorize([1, 2], 'not an object'), TypeError);
});
