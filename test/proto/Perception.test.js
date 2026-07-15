import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive throws on invalid input', async () => {
  await assert.rejects(() => perception.perceive(null, 3), { message: 'input cannot be null or undefined' });
  await assert.rejects(() => perception.perceive(123, 3), { message: 'input must be a string' });
  await assert.rejects(() => perception.perceive('test', 0), { message: 'urgency must be a number between 1 and 5' });
  await assert.rejects(() => perception.perceive('test', 6), { message: 'urgency must be a number between 1 and 5' });
});

test('perceive processes valid input', async () => {
  const result = await perception.perceive('test input', 3);
  assert.deepEqual(result, { processed: 'Percept from: test input', urgency: 3 });
});

test('perceiveMultiple throws on invalid input', async () => {
  await assert.rejects(() => perception.perceiveMultiple(null), { message: 'inputs must be an array' });
  await assert.rejects(() => perception.perceiveMultiple([ { input: null, urgency: 3 } ]), { message: 'input cannot be null or undefined' });
  await assert.rejects(() => perception.perceiveMultiple([ { input: 123, urgency: 3 } ]), { message: 'input must be a string' });
  await assert.rejects(() => perception.perceiveMultiple([ { input: 'test', urgency: 0 } ]), { message: 'urgency must be a number between 1 and 5' });
});

test('perceiveMultiple processes valid inputs', async () => {
  const results = await perception.perceiveMultiple([
    { input: 'input 1', urgency: 1 },
    { input: 'input 2', urgency: 2 }
  ]);
  assert.deepEqual(results, [
    { processed: 'Percept from: input 1', urgency: 1 },
    { processed: 'Percept from: input 2', urgency: 2 }
  ]);
});

test('handleSensoryInput throws on invalid sources', async () => {
  await assert.rejects(() => perception.handleSensoryInput(null, 3), { message: 'sources must be an array' });
});

test('handleSensoryInput processes valid sources', async () => {
  const results = await perception.handleSensoryInput(['source 1', 'source 2'], 2);
  assert.deepEqual(results, [
    { processed: 'Percept from: source 1', urgency: 2 },
    { processed: 'Percept from: source 2', urgency: 2 }
  ]);
});
