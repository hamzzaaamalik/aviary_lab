import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorize sensory inputs', () => {
  const perception = new Perception();
  const inputs = [
    { type: 'sight', data: 'light' },
    { type: 'sound', data: 'wave' },
    { type: 'sight', data: 'color' }
  ];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    sight: [
      { type: 'sight', data: 'light' },
      { type: 'sight', data: 'color' }
    ],
    sound: [{ type: 'sound', data: 'wave' }]
  });
});


test('filter sensory inputs by category', () => {
  const perception = new Perception();
  const inputs = [
    { type: 'sight', data: 'light' },
    { type: 'sound', data: 'wave' }
  ];
  const filtered = perception.filterSensoryInputs(inputs, 'sight');
  assert.deepEqual(filtered, [{ type: 'sight', data: 'light' }]);
});


test('advanced filter sensory inputs by categories', () => {
  const perception = new Perception();
  const inputs = [
    { type: 'sight', data: 'light' },
    { type: 'sound', data: 'wave' },
    { type: 'sound', data: 'echo' }
  ];
  const filtered = perception.advancedFilterSensoryInputs(inputs, ['sound']);
  assert.deepEqual(filtered, [
    { type: 'sound', data: 'wave' },
    { type: 'sound', data: 'echo' }
  ]);
});


test('validate sensory inputs', () => {
  const perception = new Perception();
  assert.throws(() => perception.validateSensoryInputs([]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ type: 'sight' }, null]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ data: 'light' }]), TypeError);
});
