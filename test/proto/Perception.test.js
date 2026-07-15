import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive throws on invalid input', async () => {
  await assert.rejects(() => perception.perceive('', 1), { message: 'input must be a non-empty string' });
  await assert.rejects(() => perception.perceive(123, 1), { message: 'input must be a non-empty string' });
  await assert.rejects(() => perception.perceive('test', 6), { message: 'urgency must be a number between 1 and 5' });
  await assert.rejects(() => perception.perceive('test', 0), { message: 'urgency must be a number between 1 and 5' });
});

test('categorizeSensoryInputs throws on invalid inputs', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), { message: 'inputs must be an array' });
  assert.throws(() => perception.categorizeSensoryInputs([]), { message: 'inputs array must not be empty' });
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), { message: 'input must be a string' });
});

test('categorizeSensoryInputs categorizes correctly', () => {
  const result = perception.categorizeSensoryInputs(['see the light', 'hear the sound', 'feel the touch', 'just a thought']);
  assert.deepEqual(result, { visual: ['see the light'], auditory: ['hear the sound'], tactile: ['feel the touch'], other: ['just a thought'] });
});

test('perceiveMultiple processes inputs in urgent order', async () => {
  const inputs = [
    { input: 'see a cat', urgency: 3 },
    { input: 'hear a dog', urgency: 5 },
    { input: 'feel the rain', urgency: 1 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results[0].processed, 'Percept from: hear a dog'); // highest urgency first
});
