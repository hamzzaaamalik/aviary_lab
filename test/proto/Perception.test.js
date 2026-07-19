import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterByCriteria filters valid inputs', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { invalid: true }
  ];
  const criteria = (input) => input.sight || input.sound;
  const result = perception.filterByCriteria(inputs, criteria);
  assert.deepEqual(result, [
    { sight: true },
    { sound: true }
  ]);
});

test('filterByCriteria throws if inputs is not an array', () => {
  assert.throws(() => perception.filterByCriteria({}, () => true), TypeError);
});

test('filterByCriteria throws if criteria is not a function', () => {
  assert.throws(() => perception.filterByCriteria([], 'not a function'), TypeError);
});

