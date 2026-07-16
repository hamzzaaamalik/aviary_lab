import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs correctly categorizes valid inputs', () => {
  const inputs = ['visual: sunset', 'auditory: thunder', 'visual: rainbow'];
  const expected = {
    visual: ['visual: sunset', 'visual: rainbow'],
    auditory: ['auditory: thunder']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  const inputs = ['valid input', 123, null];
  assert.throws(() => perception.categorizeSensoryInputs(inputs), TypeError);
});

