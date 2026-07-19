import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processMultiple categorizes multiple inputs correctly', async () => {
  const inputs = [{ sight: true }, { sound: true }, { touch: true }];
  const results = await perception.processMultiple(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { touch: true }, category: 'tactile' }
  ]);
});

test('processMultiple throws TypeError on non-array input', async () => {
  await assert.rejects(() => perception.processMultiple('not an array'), {
    name: 'TypeError',
    message: 'Inputs must be an array'
  });
});

test('processMultiple throws TypeError on empty array', async () => {
  await assert.rejects(() => perception.processMultiple([]), {
    name: 'TypeError',
    message: 'Inputs array cannot be empty'
  });
});

test('processMultiple throws TypeError on null input', async () => {
  await assert.rejects(() => perception.processMultiple([null]), {
    name: 'TypeError',
    message: 'Input cannot be null or undefined'
  });
});
