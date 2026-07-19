import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processMultiple categorizes inputs correctly', async () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { touch: true }
  ];
  const results = await perception.processMultiple(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { touch: true }, category: 'tactile' }
  ]);
});

test('processMultiple throws on empty array', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple([]);
  }, { message: 'Inputs array cannot be empty' });
});

test('processMultiple throws on non-array input', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple('not an array');
  }, { message: 'Inputs must be an array' });
});

test('processMultiple throws on null input', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple(null);
  }, { message: 'Inputs must be an array' });
});

test('processMultiple throws on undefined input', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple(undefined);
  }, { message: 'Inputs must be an array' });
});

