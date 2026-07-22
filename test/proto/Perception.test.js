import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on duplicate keys', () => {
  const inputs = [{ id: 1 }, { id: 2 }, { id: 1 }];
  const classifier = (input) => input.id;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify works with unique keys', () => {
  const inputs = [{ id: 1 }, { id: 2 }];
  const classifier = (input) => input.id;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    '1': [{ id: 1 }],
    '2': [{ id: 2 }]
  });
});

test('classify throws on invalid input', () => {
  const inputs = [{ id: 1 }, null];
  const classifier = (input) => input.id;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify throws on invalid key', () => {
  const inputs = [{ id: 1 }, { id: 2 }];
  const classifier = (input) => null;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});
