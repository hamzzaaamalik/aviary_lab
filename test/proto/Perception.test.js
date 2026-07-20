import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for invalid input objects', () => {
  assert.throws(() => perception.categorizeSensoryInputs([{}]), TypeError);
});

test('categorizeSensoryInputs returns categorized data', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: { type: 'sound' }, category: 'sound' },
    { input: { type: 'sight' }, category: 'sight' }
  ]);
});

test('validateSensoryInputs throws TypeError for invalid input types', () => {
  assert.throws(() => perception.validateSensoryInputs([null]), TypeError);
});

test('process method calls validate and categorize', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: { type: 'sound' }, category: 'sound', context: 'context for sound' },
    { input: { type: 'sight' }, category: 'sight', context: 'context for sight' }
  ]);
});

test('batchProcess method works as expected', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const result = perception.batchProcess(inputs);
  assert.deepEqual(result, [
    { input: { type: 'sound' }, category: 'sound', context: 'context for sound' },
    { input: { type: 'sight' }, category: 'sight', context: 'context for sight' }
  ]);
});

test('enhanceContext throws TypeError for invalid input', () => {
  assert.throws(() => perception.enhanceContext('not an array'), TypeError);
});

test('enhanceContext returns empty array for empty input', () => {
  const result = perception.enhanceContext([]);
  assert.deepEqual(result, []);
});
