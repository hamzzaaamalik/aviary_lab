import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processMultiple categorizes valid inputs', async () => {
  const inputs = [{ sight: true }, { sound: true }];
  const results = await perception.processMultiple(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

test('processMultiple handles invalid input with error messages', async () => {
  const inputs = [{ sight: true }, null, { sound: true }];
  const results = await perception.processMultiple(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: null, error: 'Input cannot be null or undefined' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

test('processMultiple rejects non-array inputs', async () => {
  await assert.rejects(() => perception.processMultiple('not an array'), {
    message: 'Inputs must be an array'
  });
});

test('processMultiple rejects empty inputs', async () => {
  await assert.rejects(() => perception.processMultiple([]), {
    message: 'Inputs array cannot be empty'
  });
});

