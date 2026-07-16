import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Previous tests...

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['info: temperature rising', 'error: overheating', 'info: normal'];
  const expected = {
    info: ['info: temperature rising', 'info: normal'],
    error: ['error: overheating']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});


test('categorizeSensoryInputs throws on empty input array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});


test('categorizeSensoryInputs throws on non-string input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});


test('categorizeSensoryInputs throws with specific error message on non-string input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', true]), TypeError, 'input must be a string, received: boolean');
});
