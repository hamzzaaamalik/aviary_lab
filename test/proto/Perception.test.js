import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs properly', () => {
  const inputs = ['hello', 42, true, null, 'world'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    string: ['hello', 'world'],
    number: [42],
    boolean: [true],
    object: [null]
  });
});


test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});
