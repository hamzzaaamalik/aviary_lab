import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes valid sensory inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
});

test('categorizeSensoryInput throws for invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(42), TypeError);
});

test('validateAndCategorize returns categorized results', () => {
  const result = perception.validateAndCategorize([{ sight: true }, { sound: true }]);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

test('process throws on null input', async () => {
  await assert.rejects(() => perception.process(null), TypeError);
});

test('processMultiple categorizes multiple inputs', async () => {
  const inputs = [{ sight: true }, { sound: true }];
  const result = await perception.processMultiple(inputs);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

test('processMultiple throws on invalid inputs', async () => {
  await assert.rejects(() => perception.processMultiple([null]), TypeError);
  await assert.rejects(() => perception.processMultiple('not an array'), TypeError);
});

