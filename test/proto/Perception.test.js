import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processAndCategorize categorizes multiple sensory inputs correctly', async () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { smell: true },
    { taste: true },
    { touch: true },
  ];
  const results = await perception.processAndCategorize(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { smell: true }, category: 'olfactory' },
    { input: { taste: true }, category: 'gustatory' },
    { input: { touch: true }, category: 'tactile' },
  ]);
});

test('processAndCategorize throws on null input', async () => {
  await assert.rejects(() => perception.processAndCategorize(null), {
    name: 'TypeError',
    message: 'Inputs must be an array',
  });
});

test('processAndCategorize throws on empty input array', async () => {
  await assert.rejects(() => perception.processAndCategorize([]), {
    name: 'TypeError',
    message: 'Inputs array cannot be empty',
  });
});

