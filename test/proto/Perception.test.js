import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes based on type', () => {
  const inputs = [1, 'string', true, null, 42];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    number: [1, 42],
    string: ['string'],
    boolean: [true],
    object: [null],
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on empty array', () => {
  assert.deepEqual(perception.categorizeSensoryInputs([]), {});
});

test('categorizeSensoryInputs throws on undefined input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([undefined]), TypeError);
});

