import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['apple', 42, null, 'banana', 7.5, {}, []];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    strings: ['apple', 'banana'],
    numbers: [42, 7.5],
    others: [null, {}, []]
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs handles empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, {
    strings: [],
    numbers: [],
    others: []
  });
});
