import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeAndFilter correctly categorizes and filters inputs', async () => {
  const data = [
    { sight: 'tree' },
    { sound: 'bird' },
    { taste: 'apple' },
    { touch: 'smooth' },
    { unknown: 'data' }
  ];
  const criteria = (item) => item.category === 'visual';
  const result = await perception.categorizeAndFilter(data, criteria);
  assert.equal(result.length, 1);
  assert.equal(result[0].input.sight, 'tree');
});

test('categorizeAndFilter throws TypeError for non-array input', async () => {
  await assert.rejects(() => perception.categorizeAndFilter({}, () => true), {
    name: 'TypeError',
    message: 'Data must be an array'
  });
});

test('categorizeAndFilter throws TypeError for invalid criteria', async () => {
  await assert.rejects(() => perception.categorizeAndFilter([{ sight: 'tree' }], 'not a function'), {
    name: 'TypeError',
    message: 'Criteria must be a function'
  });
});
