import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs correctly categorizes inputs', () => {
  const inputs = ['text', 123, true, null, undefined];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    string: ['text'],
    number: [123],
    boolean: [true],
    object: [null],
    undefined: [undefined],
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs handles empty array', () => {
  const categorized = perception.categorizeSensoryInputs([]);
  assert.deepEqual(categorized, {});
});
