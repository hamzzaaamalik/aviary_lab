import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('normalize correctly scales inputs to range [0, 1]', () => {
  const perception = new Perception();
  const inputs = [0, 50, 100];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.5, 1]);
});

test('normalize handles empty array', () => {
  const perception = new Perception();
  const normalized = perception.normalize([]);
  assert.deepEqual(normalized, []);
});

test('normalize handles identical inputs', () => {
  const perception = new Perception();
  const inputs = [42, 42, 42];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0]);
});

test('normalize throws TypeError for invalid inputs', () => {
  const perception = new Perception();
  assert.throws(() => perception.normalize([1, 'invalid', 3]), TypeError);
  assert.throws(() => perception.normalize([1, Infinity, 3]), TypeError);
});

