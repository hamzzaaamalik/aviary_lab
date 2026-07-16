import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    'audio:sound1',
    'visual:image1',
    'tactile:touch1',
    'some other input'
  ];
  const expected = {
    audio: ['audio:sound1'],
    visual: ['visual:image1'],
    tactile: ['tactile:touch1'],
    other: ['some other input']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['audio:sound1', 2]), TypeError);
});

test('categorizeSensoryInputs handles empty input array', () => {
  const result = perception.categorizeSensoryInputs([]);
  const expected = { audio: [], visual: [], tactile: [], other: [] };
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on non-string inputs', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['audio:sound1', 123]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['audio:sound1', null]), TypeError);
});
