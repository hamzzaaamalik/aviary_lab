import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processMultiple categorizes multiple sensory inputs', async () => {
  const inputs = [
    { sight: 'tree' },
    { sound: 'bird' },
    { smell: 'flower' },
    { unknown: 'data' }
  ];
  const results = await perception.processMultiple(inputs);
  assert.deepEqual(results, [
    { input: { sight: 'tree' }, category: 'visual' },
    { input: { sound: 'bird' }, category: 'auditory' },
    { input: { smell: 'flower' }, category: 'olfactory' },
    { input: { unknown: 'data' }, category: 'unknown' }
  ]);
});

test('processMultiple throws if inputs is not an array', async () => {
  await assert.rejects(() => perception.processMultiple(null), {
    name: 'TypeError',
    message: 'Inputs must be an array'
  });
});

test('processMultiple throws if inputs array is empty', async () => {
  await assert.rejects(() => perception.processMultiple([]), {
    name: 'TypeError',
    message: 'Inputs array cannot be empty'
  });
});

test('processMultiple throws if an input is null', async () => {
  await assert.rejects(() => perception.processMultiple([null]), {
    name: 'TypeError',
    message: 'Input cannot be null or undefined'
  });
});

