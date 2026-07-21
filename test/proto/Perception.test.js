import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect detects inputs based on a condition', () => {
  const inputs = [1, 2, 3, 4, 5];
  const condition = (input) => input > 3;
  const result = perception.detect(inputs, condition);
  assert.deepEqual(result, [4, 5]);
});

test('filter filters inputs based on criteria', () => {
  const inputs = [1, 2, 3, 4, 5];
  const criteria = (input) => input % 2 === 0;
  const result = perception.filter(inputs, criteria);
  assert.deepEqual(result, [2, 4]);
});

test('classify classifies inputs into categories', () => {
  const inputs = ['apple', 'banana', 'carrot', 'date'];
  const classifier = (input) => input[0]; // Classify by first letter
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    a: ['apple'],
    b: ['banana'],
    c: ['carrot'],
    d: ['date'],
  });
});

// Edge case tests for classify method

test('classify handles duplicate keys correctly', () => {
  const inputs = ['apple', 'apricot', 'banana', 'blueberry', 'carrot'];
  const classifier = (input) => input[0];
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    a: ['apple', 'apricot'],
    b: ['banana', 'blueberry'],
    c: ['carrot'],
  });
});

test('classify handles undefined classifier return values gracefully', () => {
  const inputs = ['apple', 'banana', 'carrot'];
  const classifier = (input) => input === 'banana' ? undefined : input[0];
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    a: ['apple'],
    c: ['carrot'],
  });
});

