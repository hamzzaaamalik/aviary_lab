import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['input1', 'input2', 42];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    string: ['input1', 'input2'],
    number: [42],
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs handles null and undefined inputs', () => {
  const inputs = [null, undefined, 'validInput'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    object: [null],
    undefined: [undefined],
    string: ['validInput']
  });
});
