import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('invalid'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([null]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([{ type: null }]), TypeError);
});

test('validateSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.validateSensoryInputs('invalid'), TypeError);
  assert.throws(() => perception.validateSensoryInputs([null]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ type: null }]), TypeError);
});

test('process enhances sensory inputs correctly', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].category, 'auditory');
  assert.equal(result[1].category, 'visual');
  assert.equal(result[0].context, 'hearing context');
  assert.equal(result[1].context, 'seeing context');
});

test('batchProcess calls process correctly', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].category, 'auditory');
  assert.equal(result[1].category, 'visual');
});

