import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = [1, 'string', true, null, 42];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    number: [1, 42],
    string: ['string'],
    boolean: [true],
    object: [null],
  });
});

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

