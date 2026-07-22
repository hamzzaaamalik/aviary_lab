import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detectInputs detects matching sensory inputs', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.detectInputs(inputs, (x) => x > 2);
  assert.deepEqual(result, [3, 4]);
});

test('filterInputs filters sensory inputs by classifier', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.filterInputs(inputs, (x) => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('classifyInputs classifies sensory inputs into categories', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.classifyInputs(inputs, (x) => (x % 2 === 0 ? 'even' : 'odd'));
  assert.deepEqual(result, {'odd': [1, 3], 'even': [2, 4]});
});

test('detectInputs throws TypeError for invalid predicate', () => {
  assert.throws(() => perception.detectInputs([1, 2, 3], 'not_a_function'), TypeError);
});

test('filterInputs throws TypeError for invalid classifier', () => {
  assert.throws(() => perception.filterInputs([1, 2, 3], 'not_a_function'), TypeError);
});

test('classifyInputs throws TypeError for invalid classifier', () => {
  assert.throws(() => perception.classifyInputs([1, 2, 3], 'not_a_function'), TypeError);
});

// Edge case tests

test('detectInputs returns empty array for empty input', () => {
  const result = perception.detectInputs([], (x) => x > 2);
  assert.deepEqual(result, []);
});


test('filterInputs returns empty array for empty input', () => {
  const result = perception.filterInputs([], (x) => x % 2 === 0);
  assert.deepEqual(result, []);
});


test('classifyInputs returns empty object for empty input', () => {
  const result = perception.classifyInputs([], (x) => (x % 2 === 0 ? 'even' : 'odd'));
  assert.deepEqual(result, {});
});
