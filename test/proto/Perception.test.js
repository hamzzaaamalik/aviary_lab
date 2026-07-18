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

test('process single input', () => {
  assert.equal(perception.process({ sight: true }), 'visual');
});

test('process multiple inputs', () => {
  const inputs = [{ sight: true }, { sound: true }, { touch: true }];
  const results = perception.processMultiple(inputs);
  assert.deepEqual(results, ['visual', 'auditory', 'tactile']);
});

test('handle structured input', () => {
  const result = perception.handleStructuredInput({ sight: true });
  assert.deepEqual(result, { category: 'visual', input: { sight: true } });
});

test('throws on invalid input', () => {
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.handleStructuredInput(undefined), TypeError);
});
