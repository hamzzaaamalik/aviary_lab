import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterSensoryInputs filters inputs by category', () => {
  const inputs = [
    { type: 'sound', data: 'whistle' },
    { type: 'sight', data: 'tree' },
    { type: 'sound', data: 'clap' }
  ];
  const filtered = perception.filterSensoryInputs(inputs, 'sound');
  assert.deepEqual(filtered, [
    { type: 'sound', data: 'whistle' },
    { type: 'sound', data: 'clap' }
  ]);
});

test('filterSensoryInputs throws on invalid category', () => {
  assert.throws(() => perception.filterSensoryInputs([], ''), TypeError);
  assert.throws(() => perception.filterSensoryInputs([], 123), TypeError);
});

test('filterSensoryInputs throws on invalid inputs', () => {
  assert.throws(() => perception.filterSensoryInputs(null, 'sound'), TypeError);
  assert.throws(() => perception.filterSensoryInputs({}, 'sound'), TypeError);
});
