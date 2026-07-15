import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('Perception processes valid input', async () => {
  const perception = new Perception();
  const percept = await perception.perceive('test input');
  assert.deepEqual(percept, { processed: 'Percept from: test input' });
});

test('Perception throws on invalid input', async () => {
  const perception = new Perception();
  await assert.rejects(async () => {
    await perception.perceive(123);
  }, { message: 'input must be a string' });
});

