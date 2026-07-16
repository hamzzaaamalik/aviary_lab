import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound of rain', 'image of sunset', 'touch of fabric', 'unknown input'];
  const expected = { auditory: ['sound of rain'], visual: ['image of sunset'], tactile: ['touch of fabric'], other: ['unknown input'] };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws TypeError for non-string items', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});
