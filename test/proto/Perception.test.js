import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound of rain', 'sight of sunset', 'sound of music'];
  const expected = {
    audio: ['sound of rain', 'sound of music'],
    visual: ['sight of sunset'],
    other: []
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws for non-string input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid input', 123]), TypeError);
});

test('categorizeSensoryInputs handles inputs with no categories', () => {
  const inputs = ['random text', 'another random'];
  const expected = {
    audio: [],
    visual: [],
    other: ['random text', 'another random']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

// New tests for edge cases

test('categorizeSensoryInputs throws for empty input array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});
