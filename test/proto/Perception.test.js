import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect filters inputs based on a condition function', () => {
  const inputs = [
    { type: 'sound', value: 'loud' },
    { type: 'sight', value: 'bright' },
    { type: 'sound', value: 'soft' },
  ];
  const detected = perception.detect(inputs, input => input.type === 'sound');
  assert.deepEqual(detected, [
    { type: 'sound', value: 'loud' },
    { type: 'sound', value: 'soft' },
  ]);
});

test('classify groups inputs into categories', () => {
  const inputs = [
    { type: 'sound', value: 'loud' },
    { type: 'sight', value: 'bright' },
    { type: 'sound', value: 'soft' },
  ];
  const categories = {
    sound: input => input.type === 'sound',
    sight: input => input.type === 'sight',
  };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, {
    sound: [
      { type: 'sound', value: 'loud' },
      { type: 'sound', value: 'soft' },
    ],
    sight: [
      { type: 'sight', value: 'bright' },
    ],
  });
});

test('detect throws TypeError if condition is not a function', () => {
  assert.throws(() => perception.detect([], 'not_a_function'), TypeError);
});

test('classify throws TypeError for invalid categories', () => {
  assert.throws(() => perception.classify([], 'not_an_object'), TypeError);
});

