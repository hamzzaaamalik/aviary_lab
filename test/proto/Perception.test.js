import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns detected sensory inputs based on predicate', () => {
  const inputs = [1, 2, 3, 4];
  const predicate = (x) => x > 2;
  const result = perception.detect(inputs, predicate);
  assert.deepEqual(result, [3, 4]);
});

test('detect throws error for non-array input', () => {
  assert.throws(() => perception.detect({}, () => true), TypeError);
});

test('detect throws error for invalid predicate', () => {
  assert.throws(() => perception.detect([1, 2, 3], 'invalid'), TypeError);
});

test('filter returns filtered sensory inputs based on classifier', () => {
  const inputs = [1, 2, 3, 4];
  const classifier = (x) => x % 2 === 0;
  const result = perception.filter(inputs, classifier);
  assert.deepEqual(result, [2, 4]);
});

test('filter throws error for non-array input', () => {
  assert.throws(() => perception.filter({}, () => true), TypeError);
});

test('filter throws error for invalid classifier', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'invalid'), TypeError);
});

// Additional edge cases

test('detect handles empty input array', () => {
  const result = perception.detect([], () => true);
  assert.deepEqual(result, []);
});

test('filter handles empty input array', () => {
  const result = perception.filter([], () => true);
  assert.deepEqual(result, []);
});
