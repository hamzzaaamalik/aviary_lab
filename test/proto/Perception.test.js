import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput throws TypeError for invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(123), TypeError);
});

test('categorizeSensoryInput categorizes valid inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
});

test('processNested categorizes nested sensory data', async () => {
  const nestedData = {
    input1: { sight: true },
    input2: { sound: true },
  };
  const results = await perception.processNested(nestedData);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
  ]);
});

test('processNested throws TypeError for invalid nested data', async () => {
  await assert.rejects(() => perception.processNested(null), TypeError);
  await assert.rejects(() => perception.processNested(123), TypeError);
});

test('processMultiple handles nested objects', async () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { touch: true },
  ];
  const results = await perception.processMultiple(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { touch: true }, category: 'tactile' },
  ]);
});

test('processMultiple throws TypeError for non-array input', async () => {
  await assert.rejects(() => perception.processMultiple(null), TypeError);
  await assert.rejects(() => perception.processMultiple(123), TypeError);
});
