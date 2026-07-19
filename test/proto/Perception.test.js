import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput classifies visual input', () => {
  const input = { sight: 'bright' };
  const category = perception.categorizeSensoryInput(input);
  assert.equal(category, 'visual');
});

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(42), TypeError);
  assert.throws(() => perception.categorizeSensoryInput('string'), TypeError);
});

test('process handles array of inputs', async () => {
  const data = [{ sight: 'bright' }, { sound: 'loud' }];
  const result = await perception.process(data);
  assert.deepEqual(result, [
    { input: data[0], category: 'visual' },
    { input: data[1], category: 'auditory' }
  ]);
});

test('process handles single input', async () => {
  const data = { smell: 'sweet' };
  const result = await perception.process(data);
  assert.deepEqual(result, [{ input: data, category: 'olfactory' }]);
});

test('process throws on invalid data', async () => {
  await assert.rejects(() => perception.process(null), TypeError);
  await assert.rejects(() => perception.process(undefined), TypeError);
  await assert.rejects(() => perception.process({}), TypeError);
});

test('filterByCriteria filters based on criteria function', () => {
  const inputs = [{ sight: 'bright' }, { sound: 'loud' }, { smell: 'sweet' }];
  const criteria = (input) => 'sight' in input;
  const result = perception.filterByCriteria(inputs, criteria);
  assert.deepEqual(result, [{ sight: 'bright' }]);
});

test('filterByCriteria throws on invalid inputs', () => {
  assert.throws(() => perception.filterByCriteria(null, () => true), TypeError);
  assert.throws(() => perception.filterByCriteria([], null), TypeError);
});
