import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput classifies sensory input correctly', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
  assert.equal(perception.categorizeSensoryInput({}), 'unknown');
});

test('process throws TypeError for invalid input', () => {
  assert.throws(() => perception.process(null), TypeError);
});

test('processMultiple classifies multiple inputs', () => {
  const inputs = [{ sight: true }, { sound: true }, { touch: true }];
  const result = perception.processMultiple(inputs);
  assert.deepEqual(result, ['visual', 'auditory', 'tactile']);
});

test('handleSingleInput handles a valid input', () => {
  const result = perception.handleSingleInput({ smell: true });
  assert.equal(result, 'olfactory');
});

test('handleSingleInput throws TypeError for invalid input', () => {
  assert.throws(() => perception.handleSingleInput(null), TypeError);
});

test('handleMultipleInputs processes multiple inputs correctly', () => {
  const inputs = [{ taste: true }, { sight: true }, { sound: true }];
  const result = perception.handleMultipleInputs(inputs);
  assert.deepEqual(result, ['gustatory', 'visual', 'auditory']);
});
