import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeAndValidateSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['audio:track1', 'video:clip1', 'text:hello', 'audio:track2'];
  const categories = perception.categorizeAndValidateSensoryInputs(inputs);
  assert.deepEqual(categories, {
    audio: ['audio:track1', 'audio:track2'],
    video: ['video:clip1'],
    text: ['text:hello'],
  });
});

test('categorizeAndValidateSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeAndValidateSensoryInputs('not an array'), TypeError);
});

test('categorizeAndValidateSensoryInputs throws on empty array', () => {
  assert.throws(() => perception.categorizeAndValidateSensoryInputs([]), TypeError);
});

test('categorizeAndValidateSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeAndValidateSensoryInputs(['valid', 123]), TypeError);
});

test('categorizeAndValidateSensoryInputs throws on null input', () => {
  assert.throws(() => perception.categorizeAndValidateSensoryInputs(['valid', null]), TypeError);
});
