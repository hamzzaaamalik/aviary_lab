import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs classifies inputs correctly', () => {
  const inputs = ['normal: input1', 'normal: input2', 'error: input3', 'normal: input4'];
  const expected = {
    normal: ['normal: input1', 'normal: input2', 'normal: input4'],
    error: ['error: input3']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('categorizeSensoryInputs throws on empty input array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

