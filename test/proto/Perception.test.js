import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeAndFilter categorizes and filters sensory data', async () => {
  const data = [
    { sight: true }, 
    { sound: true }, 
    { unknown: true }
  ];
  const criteria = (item) => item.category !== 'unknown';
  const result = await perception.categorizeAndFilter(data, criteria);
  assert.equal(result.length, 2);
  assert.deepEqual(result[0].input, { sight: true });
  assert.deepEqual(result[1].input, { sound: true });
});

test('categorizeAndFilter throws error on non-array input', async () => {
  await assert.rejects(() => perception.categorizeAndFilter({}, () => true), {
    name: 'TypeError',
    message: 'Data must be an array'
  });
});

