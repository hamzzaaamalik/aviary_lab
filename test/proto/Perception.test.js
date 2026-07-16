import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs correctly categorizes inputs', () => {
  const inputs = ['sound:wave', 'sight:color', 'touch:soft', 'smell:rose', 'taste:sweet'];
  const expected = {
    auditory: ['sound:wave'],
    visual: ['sight:color'],
    tactile: ['touch:soft'],
    olfactory: ['smell:rose'],
    gustatory: ['taste:sweet']
  };
  assert.deepEqual(perception.categorizeSensoryInputs(inputs), expected);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on non-string input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['sound:wave', 123]), TypeError);
});

