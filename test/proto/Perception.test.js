import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles non-numeric inputs', () => {
  const inputs = [1, 2, null, undefined, 'string'];
  const thresholds = { category1: 1 };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});

test('classify handles undefined thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, undefined), TypeError);
});

// Other existing tests...