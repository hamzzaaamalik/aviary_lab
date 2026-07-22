import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles empty input', () => {
  const result = perception.classify([], (input) => input.type);
  assert.deepEqual(result, {});
});

test('classify throws on non-unique keys', () => {
  const inputs = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
  assert.throws(() => {
    perception.classify(inputs, (input) => input.type);
  }, TypeError, /Duplicate key found: a/);
});

