import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect works with async predicate', async () => {
  const inputs = [1, 2, 3, 4];
  const result = await perception.detect(inputs, async (input) => input > 2);
  assert.deepEqual(result, [3, 4]);
});

test('filter works with async classifier', async () => {
  const inputs = [1, 2, 3, 4];
  const result = await perception.filter(inputs, async (input) => input % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('classify works with async classifier', async () => {
  const inputs = ['apple', 'banana', 'avocado'];
  const result = await perception.classify(inputs, async (input) => {
    if (input.startsWith('a')) return 'A';
    return 'B';
  });
  assert.deepEqual(result, {
    A: ['apple', 'avocado'],
    B: ['banana']
  });
});

