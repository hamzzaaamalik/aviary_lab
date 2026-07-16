import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeInputs categorizes inputs correctly', () => {
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
  const result = perception.categorizeInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeInputs handles empty array', () => {
  const perception = new Perception();
  const result = perception.categorizeInputs([]);
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

test('categorizeInputs throws on non-array input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeInputs('not an array'), TypeError);
});

test('categorizeInputs throws on invalid input type', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeInputs(['valid input', 123]), TypeError);
});
