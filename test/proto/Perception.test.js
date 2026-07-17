import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const input = ['hello', 42, { key: 'value' }, null, true];
  const expected = {
    strings: ['hello'],
    numbers: [42],
    objects: [{ key: 'value' }],
    others: [null, true]
  };
  const result = perception.categorizeSensoryInputs(input);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs handles empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  const expected = {
    strings: [],
    numbers: [],
    objects: [],
    others: []
  };
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('validateSensoryInput throws on empty string input', () => {
  assert.throws(() => perception.validateSensoryInput('', 3), TypeError);
});

test('validateSensoryInput throws on invalid urgency', () => {
  assert.throws(() => perception.validateSensoryInput('input', 0), TypeError);
  assert.throws(() => perception.validateSensoryInput('input', 6), TypeError);
  assert.throws(() => perception.validateSensoryInput('input', 'not a number'), TypeError);
});
