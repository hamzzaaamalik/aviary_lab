import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateAndCategorize categorizes valid inputs', async () => {
  const inputs = [{ sight: true }, { sound: true }, { smell: true }];
  const results = await perception.validateAndCategorize(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { smell: true }, category: 'olfactory' }
  ]);
});

test('validateAndCategorize throws for invalid input', async () => {
  await assert.rejects(() => perception.validateAndCategorize('not an array'), {
    name: 'TypeError',
    message: 'Data must be an array'
  });
});

test('processAndValidateMultiple categorizes asynchronously', async () => {
  const inputs = [{ taste: true }, { touch: true }];
  const results = await perception.processAndValidateMultiple(inputs);
  assert.deepEqual(results, [
    { input: { taste: true }, category: 'gustatory' },
    { input: { touch: true }, category: 'tactile' }
  ]);
});

test('processAndValidateMultiple throws for invalid input', async () => {
  await assert.rejects(() => perception.processAndValidateMultiple(null), {
    name: 'TypeError',
    message: 'Data must be an array'
  });
});
