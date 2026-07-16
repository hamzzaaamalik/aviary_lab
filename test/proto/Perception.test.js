import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound', 'light', 'sound'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    string: ['sound', 'light', 'sound']
  });
});

test('categorizeSensoryInputs throws on invalid input types', () => {
  assert.throws(() => {
    perception.categorizeSensoryInputs(['valid', 123]);
  }, { message: 'input must be a string' });
});

test('categorizeSensoryInputs throws on empty inputs array', () => {
  assert.throws(() => {
    perception.categorizeSensoryInputs([]);
  }, { message: 'inputs array must not be empty' });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => {
    perception.categorizeSensoryInputs('not an array');
  }, { message: 'inputs must be an array' });
});

