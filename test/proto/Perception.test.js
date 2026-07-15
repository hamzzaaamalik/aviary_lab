import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive throws on invalid input', async () => {
  await assert.rejects(() => perception.perceive(123, 3), { message: 'input must be a string' });
  await assert.rejects(() => perception.perceive('test', 6), { message: 'urgency must be a number between 1 and 5' });
});

test('perceiveMultiple throws on invalid inputs', async () => {
  await assert.rejects(() => perception.perceiveMultiple(123), { message: 'inputs must be an array' });
  await assert.rejects(() => perception.perceiveMultiple([{ input: 123, urgency: 3 }]), { message: 'input must be a string' });
  await assert.rejects(() => perception.perceiveMultiple([{ input: 'test', urgency: 6 }]), { message: 'urgency must be a number between 1 and 5' });
});

test('categorizeInputs categorizes inputs correctly', () => {
  const inputs = ['see the sky', 'hear the sound', 'feel the warmth', 'unknown input'];
  const categories = perception.categorizeInputs(inputs);
  assert.deepEqual(categories, {
    visual: ['see the sky'],
    auditory: ['hear the sound'],
    tactile: ['feel the warmth'],
    other: ['unknown input']
  });
});

// Additional tests to validate proper functioning

test('perceiveMultiple processes valid inputs', async () => {
  const inputs = [
    { input: 'see the sky', urgency: 2 },
    { input: 'hear the sound', urgency: 5 },
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2);
});
