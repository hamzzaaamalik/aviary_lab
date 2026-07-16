import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['normal input 1', 'normal input 2', 'error: something went wrong'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    normal: ['normal input 1', 'normal input 2'],
    error: ['error: something went wrong'],
  });
});

test('categorizeSensoryInputs handles empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, {});
});

test('categorizeSensoryInputs throws on invalid input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

