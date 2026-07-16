import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes input by type', () => {
  const inputs = ['text', 42, true, 'another string', null];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, { strings: ['text', 'another string'], numbers: [42], others: [true, null] });
});

test('categorizeSensoryInputs throws for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws for empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});
