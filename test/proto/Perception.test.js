import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes valid sensory input', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
});

test('categorizeSensoryInput throws TypeError on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput('invalid'), TypeError);
});

test('process processes valid data', () => {
  assert.equal(perception.process({ sight: true }), 'visual');
});

test('process throws TypeError on invalid data', () => {
  assert.throws(() => perception.process(null), TypeError);
});

test('processMultiple processes an array of inputs', () => {
  const inputs = [ { sight: true }, { sound: true } ];
  const results = perception.processMultiple(inputs);
  assert.deepEqual(results, ['visual', 'auditory']);
});

test('handleSingleInput validates and categorizes single input', () => {
  assert.equal(perception.handleSingleInput({ smell: true }), 'olfactory');
});

test('handleMultipleInputs validates and categorizes multiple inputs', () => {
  const inputs = [ { taste: true }, { touch: true } ];
  const results = perception.handleMultipleInputs(inputs);
  assert.deepEqual(results, ['gustatory', 'tactile']);
});

test('validateAndCategorize throws TypeError on invalid input', () => {
  assert.throws(() => perception.validateAndCategorize(null), TypeError);
});

