import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = ['hello', 42, { key: 'value' }, null, true];
  const expected = {
    strings: ['hello'],
    numbers: [42],
    objects: [{ key: 'value' }],
    others: [null, true]
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs handles empty array', () => {
  const perception = new Perception();
  const result = perception.categorizeSensoryInputs([]);
  const expected = {
    strings: [],
    numbers: [],
    objects: [],
    others: []
  };
  assert.deepEqual(result, expected);
});

// Additional tests for perceive and perceiveMultiple would go here.