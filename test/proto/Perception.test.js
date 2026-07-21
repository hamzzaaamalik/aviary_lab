import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect identifies sensory inputs based on criteria', () => {
  const inputs = [
    { type: 'sound', value: 'loud' },
    { type: 'sight', value: 'bright' },
    { type: 'sound', value: 'soft' },
  ];
  const criteria = input => input.type === 'sound';
  const detected = perception.detect(inputs, criteria);
  assert.deepEqual(detected, [
    { type: 'sound', value: 'loud' },
    { type: 'sound', value: 'soft' },
  ]);
});

test('detect throws on invalid inputs', () => {
  assert.throws(() => perception.detect(null, () => true), TypeError);
  assert.throws(() => perception.detect([], null), TypeError);
});

