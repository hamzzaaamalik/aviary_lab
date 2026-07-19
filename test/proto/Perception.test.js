import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'visual' },
    { type: 'auditory' },
    { type: 'unknown' },
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'visual' },
    { input: inputs[1], category: 'auditory' },
    { input: inputs[2], category: 'unknown' },
  ]);
});

test('process enhances categorized inputs', () => {
  const inputs = [
    { type: 'visual' },
    { type: 'auditory' },
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].context, 'context related to visual perception');
  assert.equal(result[1].context, 'context related to auditory perception');
});

test('process throws TypeError with invalid input', () => {
  assert.throws(() => perception.process('not an array'), TypeError);
});

test('enhanceContext handles empty input gracefully', () => {
  const result = perception.enhanceContext([]);
  assert.deepEqual(result, []);
});

test('categorizeSensoryInputs throws TypeError with invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([{ type: null }]), TypeError);
});
