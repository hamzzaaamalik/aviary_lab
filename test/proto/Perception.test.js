import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes known inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
});

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError, 'Invalid sensory input: must be a non-null object.');
  assert.throws(() => perception.categorizeSensoryInput(42), TypeError, 'Invalid sensory input: must be a non-null object.');
});

test('validateAndCategorize processes an array of inputs', () => {
  const results = perception.validateAndCategorize([
    { sight: true },
    { sound: true }
  ]);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

test('process throws on invalid data', async () => {
  await assert.rejects(perception.process(null), { message: 'Data cannot be null.' });
  await assert.rejects(perception.process(undefined), { message: 'Data cannot be undefined.' });
  await assert.rejects(perception.process({}), { message: 'Data cannot be an empty object.' });
});

test('processMultiple categorizes multiple inputs', async () => {
  const results = await perception.processMultiple([{ sight: true }, { sound: true }]);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

test('processMultiple throws on invalid inputs', async () => {
  await assert.rejects(perception.processMultiple(null), { message: 'Inputs must be an array of sensory data.' });
  await assert.rejects(perception.processMultiple([]), { message: 'Inputs array cannot be empty.' });
});

