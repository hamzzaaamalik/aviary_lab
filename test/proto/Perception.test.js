import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method identifies matching inputs', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.detect(inputs, n => n > 2);
  assert.deepEqual(result, [3, 4]);
});

test('filter method filters inputs correctly', () => {
  const inputs = [1, 2, 3, 4];
  const result = perception.filter(inputs, n => n % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('classify method classifies inputs based on keys', () => {
  const inputs = [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }, { type: 'vegetable', name: 'carrot' }];
  const result = perception.classify(inputs, input => input.type);
  assert.deepEqual(result, {
    fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
    vegetable: [{ type: 'vegetable', name: 'carrot' }]
  });
});

