import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processMultiple categorizes inputs correctly', async () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { touch: true },
    null,
    undefined
  ];
  await assert.rejects(async () => {
    await perception.processMultiple(inputs);
  }, { name: 'TypeError' });
});

test('processMultiple throws on empty array', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple([]);
  }, { name: 'TypeError', message: 'Inputs array cannot be empty' });
});

test('processMultiple throws on non-array input', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple({});
  }, { name: 'TypeError', message: 'Inputs must be an array' });
});

test('processMultiple handles valid inputs', async () => {
  const inputs = [
    { sight: true },
    { sound: true }
  ];
  const results = await perception.processMultiple(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

