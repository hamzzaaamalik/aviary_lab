import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('filterByCriteria filters inputs correctly', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { smell: true },
    { taste: true },
  ];
  const criteria = (input) => 'sight' in input;
  const filtered = perception.filterByCriteria(inputs, criteria);
  assert.deepEqual(filtered, [{ sight: true }]);
});

test('filterByCriteria throws TypeError for non-array inputs', () => {
  assert.throws(() => perception.filterByCriteria('not an array', () => true), TypeError);
});

test('filterByCriteria throws TypeError for non-function criteria', () => {
  assert.throws(() => perception.filterByCriteria([], 'not a function'), TypeError);
});

