import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs by keys', () => {
  const inputs = [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }, { type: 'vegetable', name: 'carrot' }];
  const classifier = (input) => input.type;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
    vegetable: [{ type: 'vegetable', name: 'carrot' }]
  });
});

test('classify throws on duplicate keys', () => {
  const inputs = [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }];
  const classifier = (input) => input.type;
  assert.doesNotThrow(() => perception.classify(inputs, classifier));
});

test('classify throws on invalid key', () => {
  const inputs = [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }];
  const classifier = (input) => undefined;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify throws on non-object input', () => {
  const inputs = [null, { type: 'fruit', name: 'apple' }];
  const classifier = (input) => input.type;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

