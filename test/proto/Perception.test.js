import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(123), TypeError);
});

test('categorizeSensoryInput returns correct categories', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
  assert.equal(perception.categorizeSensoryInput({}), 'unknown');
});

test('validateAndCategorize throws on non-array input', () => {
  assert.throws(() => perception.validateAndCategorize('not an array'), TypeError);
});

test('validateAndCategorize returns categorized results', () => {
  const result = perception.validateAndCategorize([{ sight: true }, { sound: true }]);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

test('process handles valid inputs', async () => {
  const category = await perception.process({ sight: true });
  assert.equal(category, 'visual');
});

test('process throws on invalid inputs', async () => {
  await assert.rejects(() => perception.process(null), TypeError);
  await assert.rejects(() => perception.process(undefined), TypeError);
});

test('processMultiple handles valid inputs', async () => {
  const results = await perception.processMultiple([{ sight: true }, { sound: true }]);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

test('processMultiple throws on invalid inputs', async () => {
  await assert.rejects(() => perception.processMultiple(null), TypeError);
  await assert.rejects(() => perception.processMultiple(undefined), TypeError);
});
