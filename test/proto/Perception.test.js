import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'sight', value: 'tree' },
    { type: 'sound', value: 'bird' },
    { type: 'sight', value: 'car' }
  ];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    sight: [ { type: 'sight', value: 'tree' }, { type: 'sight', value: 'car' } ],
    sound: [ { type: 'sound', value: 'bird' } ]
  });
});

test('handleMultipleInputs calls categorizeSensoryInputs', () => {
  const inputs = [
    { type: 'sight', value: 'tree' },
    { type: 'sound', value: 'bird' }
  ];
  const categorized = perception.handleMultipleInputs(inputs);
  assert.deepEqual(categorized, perception.categorizeSensoryInputs(inputs));
});

test('filterSensoryInputs filters correctly', () => {
  const inputs = [
    { type: 'sight', value: 'tree' },
    { type: 'sound', value: 'bird' }
  ];
  const filtered = perception.filterSensoryInputs(inputs, 'sight');
  assert.deepEqual(filtered, [ { type: 'sight', value: 'tree' } ]);
});

test('advancedFilterSensoryInputs filters correctly', () => {
  const inputs = [
    { type: 'sight', value: 'tree' },
    { type: 'sound', value: 'bird' }
  ];
  const filtered = perception.advancedFilterSensoryInputs(inputs, ['sight']);
  assert.deepEqual(filtered, [ { type: 'sight', value: 'tree' } ]);
});

test('validateSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.validateSensoryInputs(null), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{}]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ type: null }]), TypeError);
});
