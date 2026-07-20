import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs throws for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws for invalid input object', () => {
  assert.throws(() => perception.categorizeSensoryInputs([{ type: null }]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([{ notType: true }]), TypeError);
});

test('categorizeSensoryInputs categorizes valid inputs', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, [
    { input: inputs[0], category: 'sound' },
    { input: inputs[1], category: 'sight' }
  ]);
});

test('process throws for invalid input types', () => {
  assert.throws(() => perception.process('not an array'), TypeError);
  assert.throws(() => perception.process([{ type: null }]), TypeError);
});

test('process enhances valid inputs', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const enhanced = perception.process(inputs);
  assert.deepEqual(enhanced, [
    { input: inputs[0], category: 'sound', context: 'Context for sound' },
    { input: inputs[1], category: 'sight', context: 'Context for sight' }
  ]);
});
