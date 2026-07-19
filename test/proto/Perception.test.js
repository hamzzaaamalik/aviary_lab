import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filter correctly filters sensory inputs', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { touch: true },
    { unknown: true }
  ];
  const criteria = (input) => 'sight' in input;
  const filtered = perception.filter(inputs, criteria);
  assert.deepEqual(filtered, [{ sight: true }]);
});

test('filter throws for non-array inputs', () => {
  assert.throws(() => perception.filter('not an array', () => true), TypeError);
});

test('filter throws for non-function criteria', () => {
  assert.throws(() => perception.filter([], 'not a function'), TypeError);
});

