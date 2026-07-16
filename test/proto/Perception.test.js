import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['info: system check', 'error: disk failure', 'info: backup complete'];
  const expected = {
    error: ['error: disk failure'],
    info: ['info: system check', 'info: backup complete'],
    general: [],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws TypeError for invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('categorizeSensoryInputs throws TypeError for empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws TypeError for non-string input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', null]), TypeError);
});

// Existing tests...

