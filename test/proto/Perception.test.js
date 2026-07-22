import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by classifier', () => {
  const inputs = [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' },
    { type: 'vegetable', name: 'carrot' }
  ];
  const result = perception.classify(inputs, input => input.type);
  assert.deepEqual(result, {
    fruit: [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' }
    ],
    vegetable: [
      { type: 'vegetable', name: 'carrot' }
    ]
  });
});

test('classify throws for non-array input', () => {
  assert.throws(() => perception.classify('not an array', () => {}), TypeError);
});

test('classify throws for invalid classifier', () => {
  assert.throws(() => perception.classify([], 'not a function'), TypeError);
});

test('classify handles duplicate keys', () => {
  const inputs = [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' }
  ];
  const result = perception.classify(inputs, input => input.type);
  assert.deepEqual(result, {
    fruit: [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' }
    ]
  });
});

test('classify throws for null input', () => {
  assert.throws(() => perception.classify(null, () => {}), TypeError);
});
