import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes visual input', () => {
  const category = perception.categorizeSensoryInput({ sight: true });
  assert.equal(category, 'visual');
});

test('categorizeSensoryInput categorizes auditory input', () => {
  const category = perception.categorizeSensoryInput({ sound: true });
  assert.equal(category, 'auditory');
});

test('process handles valid data', () => {
  const category = perception.process({ sight: true });
  assert.equal(category, 'visual');
});

test('processMultiple categorizes multiple inputs', () => {
  const inputs = [{ sight: true }, { sound: true }, { smell: true }];
  const categories = perception.processMultiple(inputs);
  assert.deepEqual(categories, ['visual', 'auditory', 'olfactory']);
});

test('handleMultipleInputs processes multiple inputs', () => {
  const inputs = [{ sight: true }, { sound: true }];
  const categories = perception.handleMultipleInputs(inputs);
  assert.deepEqual(categories, ['visual', 'auditory']);
});

test('handleSingleInput throws on null input', () => {
  assert.throws(() => perception.handleSingleInput(null), TypeError);
});

test('handleMultipleInputs throws on non-array input', () => {
  assert.throws(() => perception.handleMultipleInputs('not an array'), TypeError);
});

