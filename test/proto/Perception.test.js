import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs groups inputs by type', () => {
  const inputs = [1, 'hello', true, null, 42, 'world'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    number: [1, 42],
    string: ['hello', 'world'],
    boolean: [true],
    object: [null]
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on invalid input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs(undefined), TypeError);
});

