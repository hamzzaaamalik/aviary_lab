import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory input', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
  assert.equal(perception.categorizeSensoryInput({}), 'unknown');
});

test('process sensory data', () => {
  assert.equal(perception.process({ sight: true }), 'visual');
  assert.throws(() => perception.process(null), TypeError);
});

test('handle multiple inputs', () => {
  const inputs = [{ sound: true }, { sight: true }, {}];
  assert.deepEqual(perception.processMultiple(inputs), ['auditory', 'visual', 'unknown']);
  assert.throws(() => perception.processMultiple(null), TypeError);
});

test('validate and process with error handling', () => {
  assert.equal(perception.validateAndProcess({ touch: true }), 'tactile');
  assert.throws(() => perception.validateAndProcess(null), TypeError);
});

