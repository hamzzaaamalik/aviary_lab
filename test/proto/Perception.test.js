import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' },
    { type: 'tactile', data: 'touch1' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'visual' },
    { input: inputs[1], category: 'auditory' },
    { input: inputs[2], category: 'tactile' }
  ]);
});

test('process enhances sensory inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].context, 'sight-related context');
  assert.equal(result[1].context, 'sound-related context');
});

test('batchProcess processes and enhances inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'tactile', data: 'touch1' }
  ];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].context, 'sight-related context');
  assert.equal(result[1].context, 'touch-related context');
});

test('categorizeSensoryInputs throws for invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([{}]), TypeError);
});

test('process throws for empty input', () => {
  assert.deepEqual(perception.process([]), []);
});

test('batchProcess throws for empty input', () => {
  assert.deepEqual(perception.batchProcess([]), []);
});

test('enhanceContext throws for invalid input', () => {
  assert.throws(() => perception.enhanceContext('not an array'), TypeError);
});

