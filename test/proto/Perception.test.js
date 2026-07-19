import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs categorizes valid inputs', () => {
  const inputs = [
    { type: 'visual' },
    { type: 'auditory' },
    { type: 'olfactory' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual' },
    { input: { type: 'auditory' }, category: 'auditory' },
    { input: { type: 'olfactory' }, category: 'olfactory' }
  ]);
});

test('categorizeSensoryInputs throws on invalid input object', () => {
  assert.throws(() => perception.categorizeSensoryInputs([{ notType: 'invalid' }]), TypeError);
});

test('enhanceContext throws on non-array input', () => {
  assert.throws(() => perception.enhanceContext('not an array'), TypeError);
});

test('enhanceContext handles empty array gracefully', () => {
  const result = perception.enhanceContext([]);
  assert.deepEqual(result, []);
});

test('process integrates categorization and context enhancement', () => {
  const inputs = [
    { type: 'visual' },
    { type: 'auditory' }
  ];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual', context: 'context related to visual perception' },
    { input: { type: 'auditory' }, category: 'auditory', context: 'context related to auditory perception' }
  ]);
});

test('process throws on invalid input', () => {
  assert.throws(() => perception.process('not an array'), TypeError);
});
