import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive throws on invalid input', async () => {
  await assert.rejects(() => perception.perceive('', 3), {
    name: 'TypeError',
    message: 'input must be a non-empty string'
  });
  await assert.rejects(() => perception.perceive(123, 3), {
    name: 'TypeError',
    message: 'input must be a non-empty string'
  });
});

test('perceive throws on invalid urgency', async () => {
  await assert.rejects(() => perception.perceive('sensor', 0), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
  await assert.rejects(() => perception.perceive('sensor', 6), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
});

test('perceiveMultiple processes valid inputs', async () => {
  const inputs = [
    { input: 'sensor1', urgency: 3 },
    { input: 'sensor2', urgency: 5 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2);
  assert.equal(results[0].processed, 'Percept from: sensor2');
  assert.equal(results[1].processed, 'Percept from: sensor1');
});

test('perceiveMultiple throws on invalid input', async () => {
  await assert.rejects(() => perception.perceiveMultiple([{ input: '', urgency: 3 }]), {
    name: 'TypeError',
    message: 'input must be a non-empty string'
  });
  await assert.rejects(() => perception.perceiveMultiple([{ input: 'sensor', urgency: 6 }]), {
    name: 'TypeError',
    message: 'urgency must be a number between 1 and 5'
  });
});

