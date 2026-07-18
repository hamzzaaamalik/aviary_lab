import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateAndCategorize correctly categorizes multiple inputs', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { unknown: true }
  ];
  const result = perception.validateAndCategorize(inputs);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { unknown: true }, category: 'unknown' }
  ]);
});

test('processMultiple categorizes multiple inputs asynchronously', async () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { taste: true }
  ];
  const result = await perception.processMultiple(inputs);
  assert.deepEqual(result, ['visual', 'auditory', 'gustatory']);
});

test('processMultiple throws TypeError for non-array input', async () => {
  await assert.rejects(() => perception.processMultiple(null), { message: 'Inputs must be an array' });
});

test('processMultiple throws TypeError for undefined input', async () => {
  await assert.rejects(() => perception.processMultiple(undefined), { message: 'Inputs must be an array' });
});

