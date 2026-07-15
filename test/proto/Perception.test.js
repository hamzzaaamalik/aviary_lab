import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('Perception processes valid input with correct urgency', async () => {
  const perception = new Perception();
  const input = 'test input';
  const urgency = 3;
  const result = await perception.perceive(input, urgency);
  assert.deepEqual(result, { processed: `Percept from: ${input}`, urgency });
});

test('Perception throws on invalid input type', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceive(123, 3), {
    name: 'TypeError',
    message: 'input must be a string'
  });
});

test('Perception throws on invalid urgency', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceive('valid input', 6), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
});

test('Perception throws on invalid urgency type', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceive('valid input', 'high'), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
});
