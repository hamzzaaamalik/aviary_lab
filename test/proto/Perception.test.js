import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process categorizes valid sensory input', async () => {
  const input = { sight: true };
  const result = await perception.process(input);
  assert.deepEqual(result, [{ input, category: 'visual' }]);
});

test('process throws TypeError for null data', async () => {
  await assert.rejects(() => perception.process(null), {
    name: 'TypeError',
    message: 'Data cannot be null',
  });
});

test('process throws TypeError for undefined data', async () => {
  await assert.rejects(() => perception.process(undefined), {
    name: 'TypeError',
    message: 'Data cannot be undefined',
  });
});

test('process throws TypeError for empty object', async () => {
  await assert.rejects(() => perception.process({}), {
    name: 'TypeError',
    message: 'Data cannot be an empty object',
  });
});

test('process categorizes an array of sensory inputs', async () => {
  const inputs = [{ sight: true }, { sound: true }];
  const results = await perception.process(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

