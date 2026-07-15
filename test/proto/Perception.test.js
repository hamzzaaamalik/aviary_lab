import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive validates input and urgency', async () => {
  await assert.rejects(() => perception.perceive(123, 3), { message: 'input must be a string' });
  await assert.rejects(() => perception.perceive('input', 6), { message: 'urgency must be a number between 1 and 5' });
  await assert.rejects(() => perception.perceive('input', 0), { message: 'urgency must be a number between 1 and 5' });
});

test('perceive processes valid input', async () => {
  const percept = await perception.perceive('see the light', 5);
  assert.equal(percept.processed, 'Percept from: see the light');
  assert.equal(percept.urgency, 5);
});

test('perceiveMultiple validates inputs', async () => {
  await assert.rejects(() => perception.perceiveMultiple(123), { message: 'inputs must be an array' });
  await assert.rejects(() => perception.perceiveMultiple([{ input: 'hear the sound', urgency: 3 }, { input: 456, urgency: 2 }]), { message: 'input must be a string' });
});

test('categorizeSensoryInputs classifies inputs correctly', () => {
  const categories = perception.categorizeSensoryInputs(['see the sun', 'hear the music', 'feel the rain']);
  assert.deepEqual(categories.visual, ['see the sun']);
  assert.deepEqual(categories.auditory, ['hear the music']);
  assert.deepEqual(categories.tactile, ['feel the rain']);
  assert.deepEqual(categories.other, []);
});
