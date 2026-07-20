import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for invalid input objects', () => {
  assert.throws(() => perception.categorizeSensoryInputs([{ type: null }]), TypeError);
});

test('process validates inputs and categorizes them', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const result = perception.process(inputs);
  assert.deepEqual(result.length, 2);
  assert.equal(result[0].category, 'sound');
  assert.equal(result[1].category, 'sight');
});

test('process throws TypeError for invalid input types', () => {
  assert.throws(() => perception.process([{ type: 'sound' }, 'invalid']));
});

test('enhanceContext throws TypeError for non-array input', () => {
  assert.throws(() => perception.enhanceContext('not an array'), TypeError);
});

test('enhanceContext returns enhanced data', () => {
  const categorizedData = [{ input: { type: 'sound' }, category: 'sound' }];
  const result = perception.enhanceContext(categorizedData);
  assert.equal(result[0].context, 'context for sound');
});
