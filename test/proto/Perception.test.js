import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['hello', 42, true, 'world', null, 100];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    strings: ['hello', 'world'],
    numbers: [42, 100],
    others: [true, null],
  });
});

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for null input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(null), TypeError);
});
