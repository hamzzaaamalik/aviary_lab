import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize - normalizes inputs to range [0, 1]', () => {
  const inputs = [10, 20, 30, 40, 50];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.25, 0.5, 0.75, 1]);
});

test('normalize - handles empty input', () => {
  const normalized = perception.normalize([]);
  assert.deepEqual(normalized, []);
});

test('normalize - throws TypeError for invalid input', () => {
  assert.throws(() => perception.normalize([10, 20, NaN]), TypeError);
  assert.throws(() => perception.normalize([10, 20, Infinity]), TypeError);
  assert.throws(() => perception.normalize([10, '20']), TypeError);
});

test('normalize - handles identical values', () => {
  const inputs = [5, 5, 5];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0]);
});

