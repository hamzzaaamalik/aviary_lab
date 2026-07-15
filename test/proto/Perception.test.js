import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('perceive processes input correctly with a filter', async () => {
  const perception = new Perception();
  const filter = (input) => input.toUpperCase();
  const result = await perception.perceive('test input', 3, filter);
  assert.deepEqual(result, { processed: 'Percept from: TEST INPUT', urgency: 3 });
});

test('perceiveMultiple processes multiple inputs with filters', async () => {
  const perception = new Perception();
  const inputs = [
    { input: 'input one', urgency: 2 },
    { input: 'input two', urgency: 5 },
  ];
  const filter = (input) => input + ' filtered';
  const results = await perception.perceiveMultiple(inputs, filter);
  assert.deepEqual(results, [
    { processed: 'Percept from: input two filtered', urgency: 5 },
    { processed: 'Percept from: input one filtered', urgency: 2 },
  ]);
});

test('perceive throws on invalid input', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceive(null, 3), { message: 'input cannot be null or undefined' });
  await assert.rejects(() => perception.perceive(123, 3), { message: 'input must be a string' });
  await assert.rejects(() => perception.perceive('valid input', 6), { message: 'urgency must be a number between 1 and 5' });
});

