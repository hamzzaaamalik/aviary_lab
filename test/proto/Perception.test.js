import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterByCriteria filters valid inputs', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { taste: true },
    { invalid: true }
  ];
  const criteria = input => 'sight' in input || 'sound' in input;
  const filtered = perception.filterByCriteria(inputs, criteria);
  assert.deepEqual(filtered, [
    { sight: true },
    { sound: true }
  ]);
});

test('filterByCriteria throws for non-array inputs', () => {
  assert.throws(() => perception.filterByCriteria('not an array', () => {}), TypeError);
});

test('filterByCriteria throws for non-function criteria', () => {
  assert.throws(() => perception.filterByCriteria([], 'not a function'), TypeError);
});

