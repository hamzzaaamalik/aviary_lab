import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput classifies visual input', () => {
  const category = perception.categorizeSensoryInput({ sight: true });
  assert.equal(category, 'visual');
});

test('categorizeSensoryInput classifies auditory input', () => {
  const category = perception.categorizeSensoryInput({ sound: true });
  assert.equal(category, 'auditory');
});

test('processAndCategorize validates and categorizes inputs', async () => {
  const result = await perception.processAndCategorize([
    { sight: true },
    { sound: true },
    { smell: true }
  ]);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { smell: true }, category: 'olfactory' }
  ]);
});

test('processAndCategorize throws on invalid input', async () => {
  await assert.rejects(() => perception.processAndCategorize('not an array'), {
    name: 'TypeError',
    message: 'Data must be an array'
  });
});

