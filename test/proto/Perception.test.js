import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput classifies valid inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
});

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(123), TypeError);
});

test('process handles valid data', () => {
  assert.equal(perception.process({ sight: true }), 'visual');
});

test('process throws on undefined data', () => {
  assert.throws(() => perception.process(undefined), TypeError);
});

test('processMultiple categorizes multiple inputs', () => {
  const results = perception.processMultiple([
    { sight: true },
    { sound: true },
    { touch: true }
  ]);
  assert.deepEqual(results, ['visual', 'auditory', 'tactile']);
});

test('handleSingleInput validates and categorizes', () => {
  assert.equal(perception.handleSingleInput({ smell: true }), 'olfactory');
});

test('handleSingleInput throws on invalid input', () => {
  assert.throws(() => perception.handleSingleInput(null), TypeError);
});

test('handleMultipleInputs validates and categorizes', () => {
  const results = perception.handleMultipleInputs([
    { taste: true },
    { sight: true }
  ]);
  assert.deepEqual(results, ['gustatory', 'visual']);
});

test('validateAndCategorize emits categorized results', () => {
  const data = [{ sound: true }, { sight: true }];
  const results = perception.validateAndCategorize(data);
  assert.deepEqual(results, [
    { input: { sound: true }, category: 'auditory' },
    { input: { sight: true }, category: 'visual' }
  ]);
});

test('validateAndCategorize throws on non-array data', () => {
  assert.throws(() => perception.validateAndCategorize('not an array'), TypeError);
});
