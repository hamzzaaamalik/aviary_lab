import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes valid inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
});

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), { message: 'Invalid sensory input: must be a non-null object' });
  assert.throws(() => perception.categorizeSensoryInput(123), { message: 'Invalid sensory input: must be a non-null object' });
});

test('process handles valid data', () => {
  assert.equal(perception.process({ sight: true }), 'visual');
});

test('process throws on invalid data', () => {
  assert.throws(() => perception.process(undefined), { message: 'Data cannot be null or undefined' });
});

test('processMultiple handles valid arrays', () => {
  const inputs = [{ sight: true }, { sound: true }];
  const categories = perception.processMultiple(inputs);
  assert.deepEqual(categories, ['visual', 'auditory']);
});

test('processMultiple throws on non-array input', () => {
  assert.throws(() => perception.processMultiple({}), { message: 'Inputs must be an array' });
});

test('validateAndProcess handles multiple inputs with errors', () => {
  const inputs = [{ sight: true }, null, { sound: true }];
  const results = perception.validateAndProcess(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: null, category: 'error', error: 'Invalid sensory input: must be a non-null object' },
    { input: { sound: true }, category: 'auditory' },
  ]);
});
