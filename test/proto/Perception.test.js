import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processAndValidateMultiple categorizes multiple inputs correctly', async () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { smell: true },
    { unknown: true },
  ];
  const results = await perception.processAndValidateMultiple(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { smell: true }, category: 'olfactory' },
    { input: { unknown: true }, category: 'unknown' },
  ]);
});

test('processAndValidateMultiple throws TypeError on non-array input', async () => {
  await assert.rejects(perception.processAndValidateMultiple('not an array'), {
    name: 'TypeError',
    message: 'Inputs must be an array',
  });
});

test('processAndValidateMultiple throws TypeError on empty array', async () => {
  await assert.rejects(perception.processAndValidateMultiple([]), {
    name: 'TypeError',
    message: 'Inputs array cannot be empty',
  });
});

