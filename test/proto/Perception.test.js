import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('handleSensoryInput categorizes valid input', async () => {
  const result = await perception.handleSensoryInput({ sight: true });
  assert.deepEqual(result, { input: { sight: true }, category: 'visual' });
});

test('handleSensoryInput throws on null input', async () => {
  await assert.rejects(() => perception.handleSensoryInput(null), {
    name: 'TypeError',
    message: 'Data cannot be null or undefined'
  });
});

test('handleSensoryInput throws on undefined input', async () => {
  await assert.rejects(() => perception.handleSensoryInput(undefined), {
    name: 'TypeError',
    message: 'Data cannot be null or undefined'
  });
});

test('handleSensoryInput throws on empty object', async () => {
  await assert.rejects(() => perception.handleSensoryInput({}), {
    name: 'TypeError',
    message: 'Data cannot be an empty object'
  });
});

