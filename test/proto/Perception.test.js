import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['audio:music', 'video:movie', 'text:hello'];
  const expected = {
    audio: ['audio:music'],
    video: ['video:movie'],
    text: ['text:hello'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws error for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws error for empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws error for invalid input type', () => {
  const inputs = ['valid', 123];
  assert.throws(() => perception.categorizeSensoryInputs(inputs), TypeError);
});
