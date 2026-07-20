import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs with valid inputs', () => {
  const perception = new Perception();
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: { type: 'sound' }, category: 'sound' },
    { input: { type: 'sight' }, category: 'sight' }
  ]);
});

test('categorizeSensoryInputs throws for invalid input type', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs('invalid'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([null]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([{ type: null }]), TypeError);
});

test('process method enhances sensory data', () => {
  const perception = new Perception();
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: { type: 'sound' }, category: 'sound', context: 'context for sound' },
    { input: { type: 'sight' }, category: 'sight', context: 'context for sight' }
  ]);
});

test('enhanceContext throws for invalid categorized data', () => {
  const perception = new Perception();
  assert.throws(() => perception.enhanceContext('invalid'), TypeError);
});
