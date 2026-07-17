import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['hello', 42, { key: 'value' }, null, true, 'world'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    strings: ['hello', 'world'],
    numbers: [42],
    objects: [{ key: 'value' }],
    others: [null, true]
  });
});

test('categorizeSensoryInputs handles empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, {
    strings: [],
    numbers: [],
    objects: [],
    others: []
  });
});

// Additional tests for the perceive and perceiveMultiple methods can be added here.