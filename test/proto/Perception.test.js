import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes valid inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
});

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
});

test('process processes valid data', () => {
  assert.equal(perception.process({ taste: true }), 'gustatory');
});

test('process throws on null data', () => {
  assert.throws(() => perception.process(null), TypeError);
});

test('processMultiple categorizes multiple inputs', () => {
  const inputs = [{ sight: true }, { sound: true }];
  const categories = perception.processMultiple(inputs);
  assert.deepEqual(categories, ['visual', 'auditory']);
});

test('handleMultipleInputs validates and categorizes multiple inputs', () => {
  const inputs = [{ smell: true }, { touch: true }];
  const categories = perception.handleMultipleInputs(inputs);
  assert.deepEqual(categories, ['olfactory', 'tactile']);
});

test('handleMultipleInputs throws on invalid input', () => {
  assert.throws(() => perception.handleMultipleInputs(null), TypeError);
  assert.throws(() => perception.handleMultipleInputs({}), TypeError);
});

