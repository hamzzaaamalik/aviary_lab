import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles invalid input', () => {
  assert.throws(() => perception.classify(null, () => 'key'), TypeError);
  assert.throws(() => perception.classify({}, () => 'key'), TypeError);
});

test('classify throws on invalid keys', () => {
  const inputs = [{ id: 1 }, { id: 2 }];
  assert.throws(() => perception.classify(inputs, () => undefined), TypeError);
});

test('classify throws on duplicate keys', () => {
  const inputs = [{ id: 1 }, { id: 1 }];
  assert.throws(() => perception.classify(inputs, input => input.id), TypeError);
});

// Additional tests for valid scenarios if needed.