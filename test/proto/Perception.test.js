import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = [
    'sound of rain',
    'sight of a sunset',
    'touch of silk',
    'taste of honey',
    'smell of coffee',
    'some random input',
  ];
  const expected = {
    sound: ['sound of rain'],
    sight: ['sight of a sunset'],
    touch: ['touch of silk'],
    taste: ['taste of honey'],
    smell: ['smell of coffee'],
    other: ['some random input'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs handles empty array', () => {
  const perception = new Perception();
  const result = perception.categorizeSensoryInputs([]);
  const expected = {
    sound: [],
    sight: [],
    touch: [],
    taste: [],
    smell: [],
    other: [],
  };
  assert.deepEqual(result, expected);
});
