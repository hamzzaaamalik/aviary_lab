import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('perceive throws on null input', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceive(null, 3), {
    name: 'TypeError',
    message: 'input cannot be null or undefined'
  });
});

test('perceive throws on undefined input', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceive(undefined, 3), {
    name: 'TypeError',
    message: 'input cannot be null or undefined'
  });
});

test('perceive throws on urgency out of range', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceive('test', 0), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
  await assert.rejects(() => perception.perceive('test', 6), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
});

test('perceiveMultiple handles invalid input gracefully', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceiveMultiple([ { input: null, urgency: 3 } ]), {
    name: 'TypeError',
    message: 'input cannot be null or undefined'
  });
  await assert.rejects(() => perception.perceiveMultiple([ { input: 'test', urgency: 6 } ]), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
});

