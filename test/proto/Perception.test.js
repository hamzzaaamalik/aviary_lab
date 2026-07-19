import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterByCriteria filters valid inputs', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { smell: true },
    { irrelevant: true }
  ];
  const criteria = (input) => 'sight' in input;
  const filtered = perception.filterByCriteria(inputs, criteria);
  assert.deepEqual(filtered, [{ sight: true }]);
});

test('filterByCriteria throws on non-array input', () => {
  assert.throws(() => perception.filterByCriteria('not an array', () => true), TypeError);
});

test('filterByCriteria throws on non-function criteria', () => {
  assert.throws(() => perception.filterByCriteria([], 'not a function'), TypeError);
});

