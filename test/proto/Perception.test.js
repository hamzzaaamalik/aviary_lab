import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('handleBatch processes multiple sensory inputs correctly', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { smell: true },
    { taste: true },
    { touch: true },
  ];
  const expected = ['visual', 'auditory', 'olfactory', 'gustatory', 'tactile'];
  const result = perception.handleBatch(inputs);
  assert.deepEqual(result, expected);
});

test('handleBatch throws TypeError on non-array input', () => {
  assert.throws(() => perception.handleBatch(null), TypeError);
  assert.throws(() => perception.handleBatch({}), TypeError);
});

test('handleBatch throws TypeError for invalid inputs', () => {
  const inputs = [
    { sight: true },
    null,
    { sound: true }
  ];
  assert.throws(() => perception.handleBatch(inputs), TypeError);
});

