import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns inputs matching the condition', () => {
  const inputs = [
    { type: 'sound', value: 'bark' },
    { type: 'sight', value: 'dog' },
    { type: 'sound', value: 'meow' }
  ];
  const condition = (input) => input.type === 'sound';
  const detected = perception.detect(inputs, condition);
  assert.deepEqual(detected, [
    { type: 'sound', value: 'bark' },
    { type: 'sound', value: 'meow' }
  ]);
});

// Test for invalid condition

test('detect throws error for invalid condition', () => {
  const inputs = [{ type: 'sound', value: 'bark' }];
  assert.throws(() => perception.detect(inputs, 'not a function'), TypeError);
});

// Test for invalid sensory inputs

test('detect throws error for invalid sensory inputs', () => {
  assert.throws(() => perception.detect('not an array', () => true), TypeError);
});
