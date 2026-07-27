import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize correctly scales inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.25, 0.5, 0.75, 1]);
});

test('normalize handles empty input', () => {
  const normalized = perception.normalize([]);
  assert.deepEqual(normalized, []);
});

test('normalize handles identical values', () => {
  const inputs = [2, 2, 2];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0]);
});

test('normalize throws on invalid input', () => {
  assert.throws(() => perception.normalize([1, 'a']), TypeError);
  assert.throws(() => perception.normalize([null]), TypeError);
  assert.throws(() => perception.normalize([Infinity]), TypeError);
});
