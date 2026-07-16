import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', async () => {
  const inputs = ['sound of rain', 'sight of sunset', 'sound of thunder'];
  const expected = {
    audio: ['sound of rain', 'sound of thunder'],
    visual: ['sight of sunset'],
  };
  const actual = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(actual, expected);
});

test('categorizeSensoryInputs throws on empty array', async () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on non-array input', async () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on invalid input types', async () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 42]), TypeError);
});

