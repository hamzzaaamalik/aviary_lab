import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests ...

test('refine returns inputs that meet the criteria', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.refine(inputs, (n) => n > 2);
  assert.deepEqual(result, [3, 4, 5]);
});

test('refine throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.refine([], 'not a function'), TypeError);
  assert.throws(() => perception.refine([1, 2, 3], null), TypeError);
});

test('refine returns empty array for no matching criteria', () => {
  const inputs = [1, 2, 3];
  const result = perception.refine(inputs, (n) => n > 5);
  assert.deepEqual(result, []);
});
