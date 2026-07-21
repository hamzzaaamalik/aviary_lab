import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns inputs matching criteria', () => {
  const inputs = [
    { type: 'sound', value: 'bang' },
    { type: 'sight', value: 'flash' },
    { type: 'sound', value: 'whisper' }
  ];
  const detected = perception.detect(inputs, input => input.type === 'sound');
  assert.deepEqual(detected, [
    { type: 'sound', value: 'bang' },
    { type: 'sound', value: 'whisper' }
  ]);
});

test('detect throws error for invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', () => true), TypeError);
  assert.throws(() => perception.detect([], 'not a function'), TypeError);
});

test('detect throws error for invalid criteria', () => {
  const inputs = [
    { type: 'sound', value: 'bang' }
  ];
  assert.throws(() => perception.detect(inputs, 'not a function'), TypeError);
});

test('detect returns empty array for no matches', () => {
  const inputs = [
    { type: 'sound', value: 'bang' }
  ];
  const detected = perception.detect(inputs, input => input.type === 'sight');
  assert.deepEqual(detected, []);
});
