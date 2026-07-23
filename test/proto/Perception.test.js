import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('enhancedClassify groups inputs by classifier keys', () => {
  const inputs = [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }, { type: 'veggie', name: 'carrot' }];
  const classifier = (input) => input.type;
  const result = perception.enhancedClassify(inputs, classifier);
  assert.deepEqual(result, {
    fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
    veggie: [{ type: 'veggie', name: 'carrot' }]
  });
});

test('enhancedClassify throws on duplicate keys', () => {
  const inputs = [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }];
  const classifier = (input) => input.type;
  const result = perception.enhancedClassify(inputs, classifier);
  assert.deepEqual(result, {
    fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }]
  });
});

test('enhancedClassify throws on invalid inputs', () => {
  const inputs = [{ type: 'fruit', name: 'apple' }, null];
  const classifier = (input) => input.type;
  assert.throws(() => perception.enhancedClassify(inputs, classifier), TypeError);
});
