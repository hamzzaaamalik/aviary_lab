import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput recognizes visual input', () => {
  const category = perception.categorizeSensoryInput({ sight: true });
  assert.equal(category, 'visual');
});

test('categorizeSensoryInput recognizes auditory input', () => {
  const category = perception.categorizeSensoryInput({ sound: true });
  assert.equal(category, 'auditory');
});

test('categorizeSensoryInput recognizes olfactory input', () => {
  const category = perception.categorizeSensoryInput({ smell: true });
  assert.equal(category, 'olfactory');
});

test('categorizeSensoryInput recognizes gustatory input', () => {
  const category = perception.categorizeSensoryInput({ taste: true });
  assert.equal(category, 'gustatory');
});

test('categorizeSensoryInput recognizes tactile input', () => {
  const category = perception.categorizeSensoryInput({ touch: true });
  assert.equal(category, 'tactile');
});

test('categorizeSensoryInput returns unknown for unrecognized input', () => {
  const category = perception.categorizeSensoryInput({});
  assert.equal(category, 'unknown');
});

test('process throws TypeError for null input', () => {
  assert.throws(() => perception.process(null), TypeError);
});

test('process returns category for valid input', () => {
  const category = perception.process({ sight: true });
  assert.equal(category, 'visual');
});

test('processMultiple throws TypeError for non-array input', () => {
  assert.throws(() => perception.processMultiple({}), TypeError);
});

test('processMultiple categorizes all inputs correctly', () => {
  const categories = perception.processMultiple([{ sight: true }, { sound: true }]);
  assert.deepEqual(categories, ['visual', 'auditory']);
});

test('handleSingleInput throws TypeError for null input', () => {
  assert.throws(() => perception.handleSingleInput(null), TypeError);
});

test('handleMultipleInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.handleMultipleInputs({}), TypeError);
});

test('handleMultipleInputs categorizes all inputs correctly', () => {
  const categories = perception.handleMultipleInputs([{ sight: true }, { smell: true }]);
  assert.deepEqual(categories, ['visual', 'olfactory']);
});

