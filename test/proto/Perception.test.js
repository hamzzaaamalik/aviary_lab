import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound', 'sight', 'smell', 'sound'];
  const expected = {
    string: ['sound', 'sight', 'smell', 'sound'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws TypeError for invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

