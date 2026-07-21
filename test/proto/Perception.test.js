import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('advancedFilterSensoryInputs filters correctly with valid categories', () => {
  const inputs = [
    { type: 'audio', content: 'sound1' },
    { type: 'video', content: 'video1' },
    { type: 'audio', content: 'sound2' },
  ];
  const result = perception.advancedFilterSensoryInputs(inputs, ['audio']);
  assert.deepEqual(result, [
    { type: 'audio', content: 'sound1' },
    { type: 'audio', content: 'sound2' },
  ]);
});

test('advancedFilterSensoryInputs throws on empty categories', () => {
  const inputs = [
    { type: 'audio', content: 'sound1' },
  ];
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, []), TypeError);
});

test('advancedFilterSensoryInputs throws on invalid category types', () => {
  const inputs = [
    { type: 'audio', content: 'sound1' },
  ];
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, [null]), TypeError);
  assert.throws(() => perception.advancedFilterSensoryInputs(inputs, [123]), TypeError);
});

