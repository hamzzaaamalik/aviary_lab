import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs throws TypeError on non-array input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError on invalid object input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs([{ type: null }]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([{ notType: 'test' }]), TypeError);
});

test('process throws TypeError on non-array input', () => {
  const perception = new Perception();
  assert.throws(() => perception.process('not an array'), TypeError);
});

test('enhanceContext throws TypeError on non-array input', () => {
  const perception = new Perception();
  assert.throws(() => perception.enhanceContext('not an array'), TypeError);
});

test('process handles valid inputs correctly', () => {
  const perception = new Perception();
  const inputs = [{ type: 'visual' }, { type: 'auditory' }];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual', context: 'sight-related context' },
    { input: { type: 'auditory' }, category: 'auditory', context: 'sound-related context' }
  ]);
});

