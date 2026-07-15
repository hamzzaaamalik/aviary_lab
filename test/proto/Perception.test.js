import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive throws on invalid input', async () => {
  await assert.rejects(() => perception.perceive(123, 3), {
    name: 'TypeError',
    message: 'input must be a string'
  });
});

test('perceive throws on invalid urgency', async () => {
  await assert.rejects(() => perception.perceive('valid input', 6), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
});

test('perceiveMultiple rejects on invalid input', async () => {
  const inputs = [
    { input: 123, urgency: 3 },
    { input: 'valid input', urgency: 2 }
  ];
  await assert.rejects(() => perception.perceiveMultiple(inputs), {
    name: 'TypeError',
    message: 'input must be a string'
  });
});

test('perceiveMultiple rejects on invalid urgency', async () => {
  const inputs = [
    { input: 'valid input', urgency: 0 },
    { input: 'valid input', urgency: 2 }
  ];
  await assert.rejects(() => perception.perceiveMultiple(inputs), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
});

test('perceiveMultiple processes valid inputs', async () => {
  const inputs = [
    { input: 'input 1', urgency: 1 },
    { input: 'input 2', urgency: 2 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2);
  assert.equal(results[0].processed, 'Percept from: input 1');
  assert.equal(results[1].processed, 'Percept from: input 2');
});
