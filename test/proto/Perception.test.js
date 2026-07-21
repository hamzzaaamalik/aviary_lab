import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('advancedFilterSensoryInputs filters by multiple categories', () => {
  const perception = new Perception();
  const inputs = [
    { type: 'sight', value: 'tree' },
    { type: 'sound', value: 'bird' },
    { type: 'sight', value: 'car' },
    { type: 'smell', value: 'flower' }
  ];
  const filtered = perception.advancedFilterSensoryInputs(inputs, ['sight', 'sound']);
  assert.deepEqual(filtered, [
    { type: 'sight', value: 'tree' },
    { type: 'sound', value: 'bird' },
    { type: 'sight', value: 'car' }
  ]);
});

test('advancedFilterSensoryInputs throws on invalid categories', () => {
  const perception = new Perception();
  const inputs = [ { type: 'sight', value: 'tree' } ];
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, []), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, ['']), TypeError);
});

// Existing tests here...
