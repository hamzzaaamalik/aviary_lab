import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes visual input', () => {
  const result = perception.categorizeSensoryInput({ sight: true });
  assert.equal(result, 'visual');
});

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
});

test('validateAndCategorize processes an array of inputs', async () => {
  const data = [{ sight: true }, { sound: true }];
  const result = await perception.validateAndCategorize(data);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ]);
});

test('process processes single input correctly', async () => {
  const data = { taste: true };
  const result = await perception.process(data);
  assert.deepEqual(result, [{ input: data, category: 'gustatory' }]);
});

test('process throws on null input', async () => {
  await assert.rejects(() => perception.process(null), TypeError);
});

test('filterByCriteria filters inputs correctly', () => {
  const inputs = [{ sight: true }, { sound: true }];
  const criteria = (input) => 'sight' in input;
  const result = perception.filterByCriteria(inputs, criteria);
  assert.deepEqual(result, [{ sight: true }]);
});

test('enhanceProcess throws on empty array', async () => {
  await assert.rejects(() => perception.enhanceProcess([]), TypeError);
});

test('enhanceProcess processes valid data', async () => {
  const data = [{ sight: true }, { smell: true }];
  const result = await perception.enhanceProcess(data);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { smell: true }, category: 'olfactory' }
  ]);
});
