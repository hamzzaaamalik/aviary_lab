import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterSensoryInputs filters by category', () => {
  const inputs = [
    { type: 'sight', data: { brightness: 100 } },
    { type: 'sound', data: { volume: 75 } },
    { type: 'sight', data: { brightness: 50 } },
  ];
  const result = perception.filterSensoryInputs(inputs, 'sight');
  assert.deepEqual(result, [
    { type: 'sight', data: { brightness: 100 } },
    { type: 'sight', data: { brightness: 50 } },
  ]);
});

test('filterSensoryInputs throws for invalid category', () => {
  const inputs = [{ type: 'sight', data: {} }];
  assert.throws(() => perception.filterSensoryInputs(inputs, ''), TypeError);
  assert.throws(() => perception.filterSensoryInputs(inputs, 123), TypeError);
});

test('filterSensoryInputs throws on invalid sensory inputs', () => {
  assert.throws(() => perception.filterSensoryInputs(null, 'sight'), TypeError);
  assert.throws(() => perception.filterSensoryInputs([], 'sight'), TypeError);
  assert.throws(() => perception.filterSensoryInputs([{ type: 'sight' }], 'sight'), TypeError);
});
