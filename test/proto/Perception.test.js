import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound:beep', 'image:cat', 'touch:soft', 'other:info'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    audio: ['sound:beep'],
    visual: ['image:cat'],
    tactile: ['touch:soft'],
    other: ['other:info']
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['sound:beep', 42]), TypeError);
});

test('categorizeSensoryInputs handles empty input', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, {
    audio: [],
    visual: [],
    tactile: [],
    other: []
  });
});
