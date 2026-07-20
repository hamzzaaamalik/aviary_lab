import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('filterSensoryInputs filters inputs by category', () => {
  const inputs = [
    { type: 'visual', data: { brightness: 70 } },
    { type: 'auditory', data: { volume: 50 } },
    { type: 'visual', data: { brightness: 30 } }
  ];
  const filtered = perception.filterSensoryInputs(inputs, 'visual');
  assert.deepEqual(filtered, [
    { type: 'visual', data: { brightness: 70 } },
    { type: 'visual', data: { brightness: 30 } }
  ]);
});

test('filterSensoryInputs throws on invalid category', () => {
  assert.throws(() => perception.filterSensoryInputs([], ''), TypeError);
  assert.throws(() => perception.filterSensoryInputs([], ' '), TypeError);
});

test('filterSensoryInputs throws on invalid sensory inputs', () => {
  assert.throws(() => perception.filterSensoryInputs('not an array', 'visual'), TypeError);
});
