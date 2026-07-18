import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('processMultiple categorizes valid inputs correctly', () => {
  const perception = new Perception();
  const inputs = [
    { sight: true },
    { sound: true },
    { smell: true },
    { touch: true },
    { unknown: true }
  ];
  const expected = ['visual', 'auditory', 'olfactory', 'tactile', 'unknown'];
  const result = perception.processMultiple(inputs);
  assert.deepEqual(result, expected);
});

test('processMultiple throws TypeError for non-array input', () => {
  const perception = new Perception();
  assert.throws(() => perception.processMultiple(null), TypeError);
  assert.throws(() => perception.processMultiple({}), TypeError);
});

test('processMultiple throws TypeError for invalid input in array', () => {
  const perception = new Perception();
  assert.throws(() => perception.processMultiple([{ sight: true }, null]), TypeError);
  assert.throws(() => perception.processMultiple([{ sound: true }, 'not an object']), TypeError);
});
