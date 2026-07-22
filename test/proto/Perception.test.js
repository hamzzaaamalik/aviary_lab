import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detectInputs detects matching sensory inputs', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.detect(inputs, (x) => x > 2);
  assert.deepEqual(result, [3, 4]);
});

test('filterInputs filters sensory inputs by classifier', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.filter(inputs, (x) => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('classifyInputs classifies sensory inputs into categories', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.classify(inputs, (x) => (x % 2 === 0 ? 'even' : 'odd'));
  assert.deepEqual(result, {
    odd: [1, 3],
    even: [2, 4],
  });
});

test('detectInputs returns empty array for empty input', () => {
  const result = perception.detect([], (x) => x > 2);
  assert.deepEqual(result, []);
});

test('filterInputs returns empty array for empty input', () => {
  const result = perception.filter([], (x) => x % 2 === 0);
  assert.deepEqual(result, []);
});

test('classifyInputs returns empty object for empty input', () => {
  const result = perception.classify([], (x) => (x % 2 === 0 ? 'even' : 'odd'));
  assert.deepEqual(result, {});
});
