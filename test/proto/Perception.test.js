import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process throws on null input', async () => {
  await assert.rejects(() => perception.process(null), {
    name: 'TypeError',
    message: 'Data cannot be null'
  });
});

test('process throws on undefined input', async () => {
  await assert.rejects(() => perception.process(undefined), {
    name: 'TypeError',
    message: 'Data cannot be undefined'
  });
});

test('process throws on empty object', async () => {
  await assert.rejects(() => perception.process({}), {
    name: 'TypeError',
    message: 'Data cannot be an empty object'
  });
});

test('processMultiple throws on null input', async () => {
  await assert.rejects(() => perception.processMultiple([null]), {
    name: 'TypeError',
    message: 'Input cannot be null or undefined'
  });
});

test('processMultiple throws on undefined input', async () => {
  await assert.rejects(() => perception.processMultiple([undefined]), {
    name: 'TypeError',
    message: 'Input cannot be null or undefined'
  });
});

test('processMultiple throws on empty array', async () => {
  await assert.rejects(() => perception.processMultiple([]), {
    name: 'TypeError',
    message: 'Inputs array cannot be empty'
  });
});
