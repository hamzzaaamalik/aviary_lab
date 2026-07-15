import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive throws error on invalid input', async () => {
  await assert.rejects(() => perception.perceive(123, 3), { message: 'input must be a string' });
  await assert.rejects(() => perception.perceive('input', 6), { message: 'urgency must be a number between 1 and 5' });
});

test('perceiveMultiple processes valid inputs', async () => {
  const inputs = [
    { input: 'input1', urgency: 1 },
    { input: 'input2', urgency: 2 }
  ];
  const percepts = await perception.perceiveMultiple(inputs);
  assert.equal(percepts.length, 2);
  assert.equal(percepts[0].processed, 'Percept from: input1');
  assert.equal(percepts[1].processed, 'Percept from: input2');
});

test('perceiveMultiple throws error on invalid input', async () => {
  await assert.rejects(() => perception.perceiveMultiple([{ input: 123, urgency: 1 }]), { message: 'input must be a string' });
  await assert.rejects(() => perception.perceiveMultiple([{ input: 'input', urgency: 6 }]), { message: 'urgency must be a number between 1 and 5' });
});

