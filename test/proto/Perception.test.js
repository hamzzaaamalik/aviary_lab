import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = ['sound:clap', 'visual:flash', 'sound:whistle'];
  const expected = {
    sound: ['sound:clap', 'sound:whistle'],
    visual: ['visual:flash']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for empty array', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws TypeError for invalid input type', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs(['sound:clap', 123]), TypeError);
});
