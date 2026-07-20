import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterSensoryInputs filters correctly', () => {
  const inputs = [
    { type: 'audio', data: 'sound1' },
    { type: 'video', data: 'video1' },
    { type: 'audio', data: 'sound2' }
  ];
  const result = perception.filterSensoryInputs(inputs, 'audio');
  assert.deepEqual(result, [
    { type: 'audio', data: 'sound1' },
    { type: 'audio', data: 'sound2' }
  ]);
});

test('filterSensoryInputs throws on invalid category', () => {
  assert.throws(() => perception.filterSensoryInputs([], ''), TypeError);
  assert.throws(() => perception.filterSensoryInputs([], 123), TypeError);
});

test('filterSensoryInputs throws on invalid inputs', () => {
  assert.throws(() => perception.filterSensoryInputs([null], 'audio'), TypeError);
  assert.throws(() => perception.filterSensoryInputs([{ type: 'audio' }], 'audio'), TypeError);
});
