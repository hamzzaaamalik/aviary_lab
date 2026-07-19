import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterByCriteria filters valid inputs', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { unknown: true }
  ];
  const criteria = input => input.hasOwnProperty('sight');
  const filtered = perception.filterByCriteria(inputs, criteria);
  assert.equal(filtered.length, 1);
  assert.deepEqual(filtered, [{ sight: true }]);
});

test('filterByCriteria throws on non-array data', () => {
  assert.throws(() => perception.filterByCriteria({}, () => true), TypeError);
});

test('filterByCriteria throws on non-function criteria', () => {
  assert.throws(() => perception.filterByCriteria([], 'not a function'), TypeError);
});

// Additional tests for categorizeSensoryInput and other methods can be added here.
