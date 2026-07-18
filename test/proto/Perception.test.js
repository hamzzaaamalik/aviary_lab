import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes visual input', () => {
  const result = perception.categorizeSensoryInput({ sight: true });
  assert.equal(result, 'visual');
});

test('categorizeSensoryInput categorizes auditory input', () => {
  const result = perception.categorizeSensoryInput({ sound: true });
  assert.equal(result, 'auditory');
});

test('process handles valid input', () => {
  const result = perception.process({ smell: true });
  assert.equal(result, 'olfactory');
});

test('processMultiple handles multiple inputs', () => {
  const results = perception.processMultiple([
    { sight: true },
    { sound: true },
    { touch: true }
  ]);
  assert.deepEqual(results, ['visual', 'auditory', 'tactile']);
});

test('handleMultipleInputs returns categories for multiple inputs', () => {
  const results = perception.handleMultipleInputs([
    { taste: true },
    { smell: true }
  ]);
  assert.deepEqual(results, ['gustatory', 'olfactory']);
});

test('validateAndCategorize returns categorized results', () => {
  const results = perception.validateAndCategorize([
    { sight: true },
    { unknownProperty: true }
  ]);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { unknownProperty: true }, category: 'unknown' }
  ]);
});

test('validateAndCategorize throws error for invalid data', () => {
  assert.throws(() => perception.validateAndCategorize(null), TypeError);
});
