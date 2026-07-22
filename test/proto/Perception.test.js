import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles duplicate keys properly', () => {
  const inputs = [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' },
    { type: 'vegetable', name: 'carrot' },
    { type: 'fruit', name: 'apple' }
  ];
  const classifier = (input) => input.type;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    fruit: [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' },
      { type: 'fruit', name: 'apple' }
    ],
    vegetable: [
      { type: 'vegetable', name: 'carrot' }
    ]
  });
});

test('classify throws on invalid key', () => {
  const inputs = [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' }
  ];
  const classifier = (input) => null; // Invalid classifier returning null key
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify returns empty object for empty input', () => {
  const result = perception.classify([], (input) => input.type);
  assert.deepEqual(result, {});
});

test('classify throws on non-object inputs', () => {
  const inputs = [
    'string',
    42,
    null,
    undefined
  ];
  const classifier = (input) => input;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

