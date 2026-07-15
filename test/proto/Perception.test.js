import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeInputs categorizes sensory input correctly', () => {
  const inputs = ['I see a bird', 'I hear a sound', 'I feel the wind', 'Just a thought'];
  const result = perception.categorizeInputs(inputs);
  assert.deepEqual(result, {
    visual: ['I see a bird'],
    auditory: ['I hear a sound'],
    tactile: ['I feel the wind'],
    other: ['Just a thought']
  });
});

test('categorizeInputs throws error for non-array input', () => {
  assert.throws(() => perception.categorizeInputs('not an array'), TypeError);
});

test('validateSensoryInput throws error for invalid input', () => {
  assert.throws(() => perception.validateSensoryInput(123, 3), TypeError);
  assert.throws(() => perception.validateSensoryInput('valid string', 10), TypeError);
});

test('perceiveMultiple processes inputs correctly', async () => {
  const inputs = [
    { input: 'I see a dog', urgency: 5 },
    { input: 'I hear music', urgency: 3 }
  ];
  const result = await perception.perceiveMultiple(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].processed, 'Percept from: I see a dog');
  assert.equal(result[1].processed, 'Percept from: I hear music');
});
