import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput classifies valid inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
});

test('categorizeSensoryInput throws for invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(42), TypeError);
});

test('process returns category for valid data', () => {
  assert.equal(perception.process({ smell: true }), 'olfactory');
});

test('process throws for invalid data', () => {
  assert.throws(() => perception.process(undefined), TypeError);
});

test('processMultiple categorizes an array of inputs', () => {
  const results = perception.processMultiple([{ taste: true }, { touch: true }]);
  assert.deepEqual(results, ['gustatory', 'tactile']);
});

test('handleSingleInput returns category', () => {
  assert.equal(perception.handleSingleInput({ sight: true }), 'visual');
});

test('handleMultipleInputs handles and categorizes multiple inputs', () => {
  const results = perception.handleMultipleInputs([{ sound: true }, { sight: true }]);
  assert.deepEqual(results, ['auditory', 'visual']);
});

test('validateAndCategorize returns categorized results', () => {
  const results = perception.validateAndCategorize([{ smell: true }, { taste: true }]);
  assert.deepEqual(results, [
    { input: { smell: true }, category: 'olfactory' },
    { input: { taste: true }, category: 'gustatory' }
  ]);
});

test('validateAndCategorize throws for non-array input', () => {
  assert.throws(() => perception.validateAndCategorize({}, TypeError));
});
