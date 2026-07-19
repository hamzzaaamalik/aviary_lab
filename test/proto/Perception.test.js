import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory input', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
  assert.equal(perception.categorizeSensoryInput({}), 'unknown');
});

test('process valid sensory data', async () => {
  const category = await perception.process({ sight: true });
  assert.equal(category, 'visual');
});

// Test invalid inputs
test('process throws error for invalid input', async () => {
  await assert.rejects(() => perception.process(null), { message: 'Data cannot be null' });
  await assert.rejects(() => perception.process(undefined), { message: 'Data cannot be undefined' });
  await assert.rejects(() => perception.process({}), { message: 'Data cannot be an empty object' });
});

test('processMultiple handles multiple inputs', async () => {
  const results = await perception.processMultiple([
    { sight: true },
    { sound: true },
    { touch: true },
  ]);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { touch: true }, category: 'tactile' },
  ]);
});

test('processMultiple throws error for invalid input', async () => {
  await assert.rejects(() => perception.processMultiple(null), { message: 'Inputs must be an array' });
  await assert.rejects(() => perception.processMultiple([]), { message: 'Inputs array cannot be empty' });
});

