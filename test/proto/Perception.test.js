import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles undefined classifier return', () => {
  const inputs = [1, 2, 3];
  const classifier = (input) => undefined;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {});
});

test('classify handles null classifier return', () => {
  const inputs = [1, 2, 3];
  const classifier = (input) => null;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {});
});

test('classify throws error on non-string key', () => {
  const inputs = [1, 2, 3];
  const classifier = (input) => input % 2; // returns 0 or 1
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

