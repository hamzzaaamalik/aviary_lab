import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('advancedFilterSensoryInputs filters correctly by multiple categories', () => {
  const inputs = [
    { type: 'sound', data: 'beep' },
    { type: 'sight', data: 'image' },
    { type: 'sound', data: 'buzz' },
  ];
  const result = perception.advancedFilterSensoryInputs(inputs, ['sound']);
  assert.deepEqual(result, [
    { type: 'sound', data: 'beep' },
    { type: 'sound', data: 'buzz' },
  ]);
});

test('advancedFilterSensoryInputs throws on invalid categories', () => {
  const inputs = [
    { type: 'sound', data: 'beep' },
  ];
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, []), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, ['sound', '']), TypeError);
});

test('advancedFilterSensoryInputs validates sensory inputs', () => {
  assert.throws(() => perception.advancedFilterSensoryInputs(null, ['sound']), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs([], ['sound']), TypeError);
});
