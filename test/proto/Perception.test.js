import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput returns correct category', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
  assert.equal(perception.categorizeSensoryInput({}), 'unknown');
});

test('validateAndCategorize throws for non-array', async () => {
  await assert.rejects(perception.validateAndCategorize('not an array'), {
    name: 'TypeError',
    message: 'Data must be an array'
  });
});

test('process handles single input and array', async () => {
  const singleResult = await perception.process({ sight: true });
  assert.deepEqual(singleResult, [{ input: { sight: true }, category: 'visual' }]);

  const arrayResult = await perception.process([{ sound: true }, { smell: true }]);
  assert.deepEqual(arrayResult, [
    { input: { sound: true }, category: 'auditory' },
    { input: { smell: true }, category: 'olfactory' }
  ]);
});

test('filterByCriteria filters inputs correctly', () => {
  const inputs = [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ];
  const criteria = (item) => item.category === 'visual';
  const filtered = perception.filterByCriteria(inputs, criteria);
  assert.deepEqual(filtered, [{ input: { sight: true }, category: 'visual' }]);
});

test('filterByCriteria throws for invalid inputs', () => {
  assert.throws(() => perception.filterByCriteria('not an array', () => true), TypeError);
  assert.throws(() => perception.filterByCriteria([], 'not a function'), TypeError);
});

