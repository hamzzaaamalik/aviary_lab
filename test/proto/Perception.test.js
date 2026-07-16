import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes valid inputs', () => {
  const inputs = ['sound: bird', 'sight: rainbow', 'touch: soft cloth'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    auditory: ['sound: bird'],
    visual: ['sight: rainbow'],
    tactile: ['touch: soft cloth']
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

