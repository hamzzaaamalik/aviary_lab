import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['hello', 42, true, 'world', null];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    strings: ['hello', 'world'],
    numbers: [42],
    others: [true, null],
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs handles empty array', () => {
  const categorized = perception.categorizeSensoryInputs([]);
  assert.deepEqual(categorized, {
    strings: [],
    numbers: [],
    others: [],
  });
});
