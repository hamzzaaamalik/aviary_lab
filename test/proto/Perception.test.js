import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterSensoryInputs filters correctly based on criteria', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { taste: true },
    { touch: true },
    null,
    undefined,
    {},
  ];
  const criteria = (input) => input && 'sight' in input;
  const filtered = perception.filterSensoryInputs(inputs, criteria);
  assert.deepEqual(filtered, [{ sight: true }]);
});

test('filterSensoryInputs throws TypeError on invalid inputs', () => {
  assert.throws(() => perception.filterSensoryInputs('not an array', () => true), TypeError);
  assert.throws(() => perception.filterSensoryInputs([], 'not a function'), TypeError);
});

