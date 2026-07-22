import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles empty input', () => {
  const result = perception.classify([], () => 'key');
  assert.deepEqual(result, {});
});

test('classify throws on non-object input', () => {
  assert.throws(() => perception.classify(['string'], () => 'key'), TypeError);
});

test('classify throws on classifier returning undefined', () => {
  assert.throws(() => perception.classify([{ id: 1 }], () => undefined), TypeError);
});

test('classify groups inputs correctly', () => {
  const inputs = [{ id: 1, type: 'A' }, { id: 2, type: 'B' }, { id: 3, type: 'A' }];
  const result = perception.classify(inputs, (input) => input.type);
  assert.deepEqual(result, {
    A: [{ id: 1, type: 'A' }, { id: 3, type: 'A' }],
    B: [{ id: 2, type: 'B' }]
  });
});

