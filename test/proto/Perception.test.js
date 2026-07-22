import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on duplicate keys', () => {
  const inputs = [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' },
    { type: 'fruit', name: 'apple' }, // duplicate key
  ];
  const classifier = (input) => input.name;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify returns classified inputs', () => {
  const inputs = [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' },
  ];
  const classifier = (input) => input.name;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    apple: [{ type: 'fruit', name: 'apple' }],
    banana: [{ type: 'fruit', name: 'banana' }],
  });
});

test('classify handles empty input', () => {
  const inputs = [];
  const classifier = (input) => input.name;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {});
});

test('classify throws on invalid input', () => {
  const inputs = [null];
  const classifier = (input) => input.name;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

