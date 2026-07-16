import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['audio:track1', 'audio:track2', 'visual:image1', 'visual:image2'];
  const expected = {
    audio: ['audio:track1', 'audio:track2'],
    visual: ['visual:image1', 'visual:image2']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input', () => {
  const inputs = ['audio:track1', 123, 'visual:image1'];
  assert.throws(() => perception.categorizeSensoryInputs(inputs), TypeError);
});

test('categorizeSensoryInputs throws on empty input array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

// Additional tests for existing methods...
