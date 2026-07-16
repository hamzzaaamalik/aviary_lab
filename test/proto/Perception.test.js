import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['hello', 42, true, 'world', null];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    string: ['hello', 'world'],
    number: [42],
    boolean: [true],
    object: [null]
  });
});

test('categorizeSensoryInputs throws on empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on invalid types', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['', 42, true, undefined]), TypeError);
});
