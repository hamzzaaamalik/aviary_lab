import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('advancedFilterSensoryInputs filters correctly by multiple categories', () => {
  const inputs = [
    { type: 'sight', value: 'light' },
    { type: 'sound', value: 'noise' },
    { type: 'sight', value: 'color' },
    { type: 'touch', value: 'texture' }
  ];
  const categories = ['sight', 'sound'];
  const result = perception.advancedFilterSensoryInputs(inputs, categories);
  assert.deepEqual(result, [
    { type: 'sight', value: 'light' },
    { type: 'sound', value: 'noise' },
    { type: 'sight', value: 'color' }
  ]);
});

test('advancedFilterSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.advancedFilterSensoryInputs(null, ['sight']), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs([], null), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs([], ['']), TypeError);
});

