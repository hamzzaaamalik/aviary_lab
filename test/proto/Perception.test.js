import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput classifies sight input', () => {
  const result = perception.categorizeSensoryInput({ sight: true });
  assert.equal(result, 'visual');
});

test('categorizeSensoryInput classifies sound input', () => {
  const result = perception.categorizeSensoryInput({ sound: true });
  assert.equal(result, 'auditory');
});


test('process handles valid sensory input', () => {
  const result = perception.process({ touch: true });
  assert.equal(result, 'tactile');
});

test('process throws TypeError on null input', () => {
  assert.throws(() => perception.process(null), TypeError);
});

test('process throws TypeError on undefined input', () => {
  assert.throws(() => perception.process(undefined), TypeError);
});

test('processMultiple categorizes multiple inputs', () => {
  const inputs = [{ sight: true }, { sound: true }];
  const results = perception.processMultiple(inputs);
  assert.deepEqual(results, ['visual', 'auditory']);
});

test('validateAndCategorize returns categorized results', () => {
  const inputs = [{ sight: true }, { smell: true }];
  const results = perception.validateAndCategorize(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { smell: true }, category: 'olfactory' }
  ]);
});

test('validateAndCategorize throws TypeError on non-array input', () => {
  assert.throws(() => perception.validateAndCategorize(null), TypeError);
});
