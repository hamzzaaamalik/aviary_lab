import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceiveMultiple processes valid inputs', async () => {
  const inputs = [
    { input: 'loud noise', urgency: 5 },
    { input: 'soft sound', urgency: 2 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2);
  assert.equal(results[0].processed, 'Percept from: loud noise');
  assert.equal(results[1].processed, 'Percept from: soft sound');
});

test('perceiveMultiple throws on invalid inputs', async () => {
  const inputs = [
    { input: 'valid input', urgency: 5 },
    { input: '', urgency: 3 }
  ];
  await assert.rejects(
    () => perception.perceiveMultiple(inputs),
    { message: 'input must be a non-empty string' }
  );
});

test('perceiveMultiple throws on non-array input', async () => {
  await assert.rejects(
    () => perception.perceiveMultiple('not an array'),
    { message: 'inputs must be an array' }
  );
});
