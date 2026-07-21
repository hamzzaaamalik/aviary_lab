import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'heat', value: 30 },
    { type: 'light', value: 100 },
    { type: 'heat', value: 32 }
  ];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    heat: [
      { type: 'heat', value: 30 },
      { type: 'heat', value: 32 }
    ],
    light: [{ type: 'light', value: 100 }]
  });
});

test('filterSensoryInputs filters inputs by category', () => {
  const inputs = [
    { type: 'heat', value: 30 },
    { type: 'light', value: 100 },
  ];
  const filtered = perception.filterSensoryInputs(inputs, 'heat');
  assert.deepEqual(filtered, [{ type: 'heat', value: 30 }]);
});

test('advancedFilterSensoryInputs filters inputs by multiple categories', () => {
  const inputs = [
    { type: 'heat', value: 30 },
    { type: 'light', value: 100 },
    { type: 'motion', value: 1 }
  ];
  const filtered = perception.advancedFilterSensoryInputs(inputs, ['heat', 'motion']);
  assert.deepEqual(filtered, [
    { type: 'heat', value: 30 },
    { type: 'motion', value: 1 }
  ]);
});

test('validateSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.validateSensoryInputs(null), TypeError);
  assert.throws(() => perception.validateSensoryInputs([]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ type: null }]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ notType: 'heat' }]), TypeError);
});

