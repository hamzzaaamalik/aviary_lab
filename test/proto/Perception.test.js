import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for invalid input objects', () => {
  assert.throws(() => perception.categorizeSensoryInputs([{ type: null }]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([{ notType: 'invalid' }]), TypeError);
});

test('categorizeSensoryInputs categorizes valid inputs', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, [
    { input: { type: 'sound' }, category: 'auditory' },
    { input: { type: 'sight' }, category: 'visual' }
  ]);
});

test('process throws TypeError for non-array input', () => {
  assert.throws(() => perception.process('not an array'), TypeError);
});

test('enhanceContext throws TypeError for invalid categorized data', () => {
  assert.throws(() => perception.enhanceContext('not an array'), TypeError);
});

test('enhanceContext enhances valid categorized data', () => {
  const categorized = [
    { input: { type: 'sound' }, category: 'auditory' },
    { input: { type: 'sight' }, category: 'visual' }
  ];
  const enhanced = perception.enhanceContext(categorized);
  assert.deepEqual(enhanced, [
    { input: { type: 'sound' }, category: 'auditory', context: 'listening' },
    { input: { type: 'sight' }, category: 'visual', context: 'looking' }
  ]);
});

