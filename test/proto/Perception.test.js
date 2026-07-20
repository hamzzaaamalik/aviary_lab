import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterSensoryInputs filters inputs by category', () => {
  const inputs = [
    { type: 'sight', data: 'image1' },
    { type: 'sound', data: 'sound1' },
    { type: 'sight', data: 'image2' }
  ];
  const result = perception.filterSensoryInputs(inputs, 'sight');
  assert.deepEqual(result, [
    { type: 'sight', data: 'image1' },
    { type: 'sight', data: 'image2' }
  ]);
});

test('filterSensoryInputs throws for invalid category', () => {
  const inputs = [
    { type: 'sight', data: 'image1' }
  ];
  assert.throws(() => perception.filterSensoryInputs(inputs, ''), TypeError);
  assert.throws(() => perception.filterSensoryInputs(inputs, null), TypeError);
});

test('filterSensoryInputs throws for invalid sensory inputs', () => {
  assert.throws(() => perception.filterSensoryInputs(null, 'sight'), TypeError);
  assert.throws(() => perception.filterSensoryInputs([], 'sight'), TypeError);
});

test('filterSensoryInputs throws for empty sensory inputs array', () => {
  assert.throws(() => perception.filterSensoryInputs([], 'sight'), TypeError);
});

test('filterSensoryInputs throws for empty input array', () => {
  assert.throws(() => perception.filterSensoryInputs([], 'sight'), TypeError);
});

