import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process categorizes valid input', async () => {
  const result = await perception.process({ sight: true });
  assert.deepEqual(result, 'visual');
});

test('process throws on null input', async () => {
  await assert.rejects(() => perception.process(null), {
    name: 'TypeError',
    message: 'Data cannot be null or undefined'
  });
});

test('process throws on undefined input', async () => {
  await assert.rejects(() => perception.process(undefined), {
    name: 'TypeError',
    message: 'Data cannot be null or undefined'
  });
});

test('process throws on empty object', async () => {
  await assert.rejects(() => perception.process({}), {
    name: 'TypeError',
    message: 'Data cannot be an empty object'
  });
});

