import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    'sound of music',
    'sight of a sunset',
    'touch of a feather',
    'smell of coffee',
    'taste of chocolate'
  ];
  const expected = {
    auditory: ['sound of music'],
    visual: ['sight of a sunset'],
    tactile: ['touch of a feather'],
    olfactory: ['smell of coffee'],
    gustatory: ['taste of chocolate']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on empty input array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on non-string input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});
