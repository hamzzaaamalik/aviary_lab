import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process method enhances sensory inputs correctly', () => {
  const inputs = [
    { type: 'visual', data: 'some visual data' },
    { type: 'auditory', data: 'some sound data' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.deepEqual(result[0].context, 'sight-related context');
  assert.deepEqual(result[1].context, 'sound-related context');
});

test('process method throws on invalid input', () => {
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.process([{ type: null }]), TypeError);
});

test('enhanceContext throws on invalid categorized data', () => {
  assert.throws(() => perception.enhanceContext(null), TypeError);
});

test('determine context throws on unknown category', () => {
  assert.throws(() => perception._determineContext('unknown'), Error);
});

test('categorizeSensoryInputs throws on invalid inputs', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([{ type: null }]), TypeError);
});
