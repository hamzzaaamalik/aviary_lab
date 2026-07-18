import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process throws on null input', async () => {
  await assert.rejects(async () => {
    await perception.process(null);
  }, { message: 'Data cannot be null' });
});

test('process throws on undefined input', async () => {
  await assert.rejects(async () => {
    await perception.process(undefined);
  }, { message: 'Data cannot be undefined' });
});

test('process throws on empty object', async () => {
  await assert.rejects(async () => {
    await perception.process({});
  }, { message: 'Data cannot be an empty object' });
});

test('processMultiple throws on non-array input', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple('not an array');
  }, { message: 'Inputs must be an array' });
});

test('processMultiple throws on empty array', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple([]);
  }, { message: 'Inputs array cannot be empty' });
});

test('processMultiple throws on null input in array', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple([null]);
  }, { message: 'Input cannot be null or undefined' });
});

test('processMultiple throws on undefined input in array', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple([undefined]);
  }, { message: 'Input cannot be null or undefined' });
});

test('processMultiple categorizes inputs correctly', async () => {
  const results = await perception.processMultiple([
    { sight: true },
    { sound: true },
    { unknown: true }
  ]);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { unknown: true }, category: 'unknown' }
  ]);
});

