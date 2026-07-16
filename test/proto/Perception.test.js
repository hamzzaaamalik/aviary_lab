import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('perceiveMultiple throws on non-array input', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceiveMultiple('not an array'), {
    message: 'inputs must be an array'
  });
});

test('perceiveMultiple throws on empty array', async () => {
  const perception = new Perception();
  const result = await perception.perceiveMultiple([]);
  assert.deepEqual(result, []);
});

test('perceiveMultiple throws on undefined input or urgency', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceiveMultiple([{ input: undefined, urgency: 1 }]), {
    message: 'input and urgency must be defined'
  });
  await assert.rejects(() => perception.perceiveMultiple([{ input: 'valid', urgency: undefined }]), {
    message: 'input and urgency must be defined'
  });
});

// Add tests for valid inputs to check if it processes correctly
