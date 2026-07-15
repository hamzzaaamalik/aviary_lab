import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeInputs classifies inputs correctly', () => {
  const inputs = ['I can see', 'I can hear', 'I can feel', 'something else'];
  const result = perception.categorizeInputs(inputs);
  assert.deepEqual(result, {
    visual: ['I can see'],
    auditory: ['I can hear'],
    tactile: ['I can feel'],
    other: ['something else']
  });
});

test('categorizeInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeInputs('not an array'), TypeError);
});

test('categorizeInputs throws on non-string input', () => {
  assert.throws(() => perception.categorizeInputs(['valid', 123]), TypeError);
});

test('categorizeInputs handles empty array', () => {
  const result = perception.categorizeInputs([]);
  assert.deepEqual(result, { visual: [], auditory: [], tactile: [], other: [] });
});
