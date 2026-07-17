import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound1', 'sound2', 'image1'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    auditory: ['sound1', 'sound2'],
    visual: ['image1']
  });
});

test('categorizeSensoryInputs handles empty input array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, {});
});

// Additional tests as necessary...