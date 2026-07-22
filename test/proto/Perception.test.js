import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateInputs throws for non-array input', () => {
  assert.throws(() => perception.validateInputs('not an array'), TypeError);
});

test('validateInputs throws for empty array', () => {
  assert.throws(() => perception.validateInputs([]), TypeError);
});

test('detect returns detected sensory inputs', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.detect(inputs, (x) => x > 2);
  assert.deepEqual(result, [3, 4]);
});

test('filter returns filtered sensory inputs', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.filter(inputs, (x) => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('classify groups sensory inputs correctly', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.classify(inputs, (x) => (x % 2 === 0 ? 'even' : 'odd'));
  assert.deepEqual(result, {
    odd: [1, 3],
    even: [2, 4],
  });
});

test('classify throws for invalid classifier', () => {
  assert.throws(() => perception.classify([], 'not a function'), TypeError);
});
