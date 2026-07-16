import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs by type', () => {
  const inputs = ['hello', 42, true, null, 'world'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    string: ['hello', 'world'],
    number: [42],
    boolean: [true],
    object: [null],
  });
});

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

// Additional tests for existing methods

test('perceive throws TypeError on invalid input', async () => {
  await assert.rejects(() => perception.perceive('', 3), { name: 'TypeError' });
});

test('perceiveMultiple returns empty array for empty input', async () => {
  const result = await perception.perceiveMultiple([]);
  assert.deepEqual(result, []);
});

