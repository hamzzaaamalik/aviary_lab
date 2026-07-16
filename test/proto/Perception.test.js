import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound:hello', 'sight:tree', 'sound:world', 'sight:sky'];
  const expectedOutput = {
    sound: ['sound:hello', 'sound:world'],
    sight: ['sight:tree', 'sight:sky'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expectedOutput);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['sound:hello', 123]), TypeError);
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs handles empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});
