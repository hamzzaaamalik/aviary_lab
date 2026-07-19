import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterInputsByCriteria filters correctly', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { taste: true },
    { sight: true }
  ];
  const filtered = perception.filterInputsByCriteria(inputs, 'visual');
  assert.equal(filtered.length, 2);
  assert.deepEqual(filtered, [{ sight: true }, { sight: true }]);
});

test('filterInputsByCriteria throws on invalid inputs', () => {
  assert.throws(() => perception.filterInputsByCriteria('not an array', 'visual'), TypeError);
  assert.throws(() => perception.filterInputsByCriteria([], 123), TypeError);
});

