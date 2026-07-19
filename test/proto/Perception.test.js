import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes correctly', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
  assert.equal(perception.categorizeSensoryInput({}), 'unknown');
});

test('validateAndCategorize throws on invalid input', async () => {
  await assert.rejects(() => perception.validateAndCategorize(null), { message: 'Data must be an array' });
});

test('process handles single input correctly', async () => {
  const result = await perception.process({ sight: true });
  assert.deepEqual(result, [{ input: { sight: true }, category: 'visual' }]);
});

test('filterByCriteria throws on invalid inputs', () => {
  assert.throws(() => perception.filterByCriteria(null, () => true), TypeError);
  assert.throws(() => perception.filterByCriteria([], 'notAFunction'), TypeError);
  assert.throws(() => perception.filterByCriteria([], () => {}), TypeError);
});

