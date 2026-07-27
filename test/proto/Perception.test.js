import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('normalize scales inputs between 0 and 1', () => {
  const inputs = [10, 20, 30];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0.5, 1]);
});

test('normalize handles empty array', () => {
  const normalized = perception.normalize([]);
  assert.deepEqual(normalized, []);
});

test('normalize throws on invalid input', () => {
  assert.throws(() => perception.normalize([10, 'a']), TypeError);
});

test('normalize returns zero for constant inputs', () => {
  const inputs = [5, 5, 5];
  const normalized = perception.normalize(inputs);
  assert.deepEqual(normalized, [0, 0, 0]);
});

