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

