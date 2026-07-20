import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs with valid inputs', () => {
  const inputs = [
    { type: 'sound', frequency: 440 },
    { type: 'image', url: 'http://example.com/image.png' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'audio' },
    { input: inputs[1], category: 'visual' }
  ]);
});

test('validateSensoryInputs throws for missing frequency in sound input', () => {
  const inputs = [{ type: 'sound' }];
  assert.throws(() => perception.validateSensoryInputs(inputs), TypeError);
});

test('validateSensoryInputs throws for missing URL in image input', () => {
  const inputs = [{ type: 'image' }];
  assert.throws(() => perception.validateSensoryInputs(inputs), TypeError);
});

test('process method works with valid inputs', () => {
  const inputs = [
    { type: 'sound', frequency: 440 },
    { type: 'image', url: 'http://example.com/image.png' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, inputs.length);
});

test('process method throws for invalid input', () => {
  const inputs = [{ type: 'image' }];
  assert.throws(() => perception.process(inputs), TypeError);
});

