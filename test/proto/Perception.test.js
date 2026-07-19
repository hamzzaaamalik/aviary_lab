import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput throws for invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(42), TypeError);
});

test('categorizeSensoryInput categorizes valid inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
});

test('validateAndCategorize throws for non-array input', () => {
  assert.throws(() => perception.validateAndCategorize(null), TypeError);
});

test('validateAndCategorize categorizes multiple sensory inputs', () => {
  const result = perception.validateAndCategorize([
    { sight: true },
    { sound: true },
    { unknown: true }
  ]);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { unknown: true }, category: 'unknown' }
  ]);
});

test('process throws for null input', async () => {
  await assert.rejects(async () => perception.process(null), TypeError);
});

test('process throws for empty object', async () => {
  await assert.rejects(async () => perception.process({}), TypeError);
});

test('process returns category for valid input', async () => {
  const category = await perception.process({ sight: true });
  assert.equal(category, 'visual');
});

test('processMultiple throws for non-array input', async () => {
  await assert.rejects(async () => perception.processMultiple(null), TypeError);
});

test('processMultiple throws for empty array', async () => {
  await assert.rejects(async () => perception.processMultiple([]), TypeError);
});

test('processMultiple categorizes inputs', async () => {
  const result = await perception.processMultiple([
    { sight: true },
    { sound: true },
    { unknown: true }
  ]);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { unknown: true }, category: 'unknown' }
  ]);
});
