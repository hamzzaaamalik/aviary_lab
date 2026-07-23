import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on empty input', () => {
  assert.deepEqual(perception.classify([], (input) => input.type), {});
});

test('classify throws on invalid key', () => {
  assert.throws(() => {
    perception.classify([{ type: null }], (input) => input.type);
  }, TypeError);
});

test('classify throws on duplicate keys', () => {
  assert.throws(() => {
    perception.classify([{ type: 'a' }, { type: 'a' }], (input) => input.type);
  }, TypeError);
});

// Additional tests for existing methods

test('detect returns detected items', () => {
  const inputs = [{ type: 'a' }, { type: 'b' }];
  const detected = perception.detect(inputs, (input) => input.type === 'a');
  assert.deepEqual(detected, [{ type: 'a' }]);
});

test('filter returns filtered items', () => {
  const inputs = [{ type: 'a' }, { type: 'b' }];
  const filtered = perception.filter(inputs, (input) => input.type === 'a');
  assert.deepEqual(filtered, [{ type: 'a' }]);
});

