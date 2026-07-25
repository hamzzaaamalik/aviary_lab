import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('classify throws on empty category object', () => {
  assert.throws(() => {
    perception.classify([1, 2, 3], {});
  }, TypeError, 'Categories cannot be an empty object.');
});

test('classify throws on non-finite thresholds', () => {
  assert.throws(() => {
    perception.classify([1, 2, 3], { high: Infinity });
  }, TypeError, 'Threshold for high must be a finite number.');
  assert.throws(() => {
    perception.classify([1, 2, 3], { low: NaN });
  }, TypeError, 'Threshold for low must be a finite number.');
});

// More tests as needed...
