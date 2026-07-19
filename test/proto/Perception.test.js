import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterSensoryData filters input based on criteria', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { smell: false },
  ];
  const criteria = (input) => 'sight' in input;
  const result = perception.filterSensoryData(inputs, criteria);
  assert.deepEqual(result, [{ sight: true }]);
});

test('filterSensoryData throws TypeError for non-array input', () => {
  assert.throws(() => perception.filterSensoryData({}, () => true), TypeError);
});

test('filterSensoryData throws TypeError for non-function criteria', () => {
  assert.throws(() => perception.filterSensoryData([], 'not a function'), TypeError);
});

