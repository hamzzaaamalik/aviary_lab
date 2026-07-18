import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
  assert.equal(perception.categorizeSensoryInput({}), 'unknown');
});

test('process valid input', () => {
  assert.equal(perception.process({ sight: true }), 'visual');
});

test('processMultiple categorizes inputs correctly', () => {
  const inputs = [ { sight: true }, { sound: true }, { smell: true } ];
  const result = perception.processMultiple(inputs);
  assert.deepEqual(result, ['visual', 'auditory', 'olfactory']);
});

test('handleSingleInput categorizes single input correctly', () => {
  assert.equal(perception.handleSingleInput({ touch: true }), 'tactile');
});

test('handleMultipleInputs categorizes multiple inputs correctly', () => {
  const inputs = [ { sight: true }, { taste: true } ];
  const result = perception.handleMultipleInputs(inputs);
  assert.deepEqual(result, ['visual', 'gustatory']);
});

test('validateAndCategorizeInput throws on invalid input', () => {
  assert.throws(() => perception.validateAndCategorizeInput(null), TypeError);
  assert.throws(() => perception.validateAndCategorizeInput(42), TypeError);
});

