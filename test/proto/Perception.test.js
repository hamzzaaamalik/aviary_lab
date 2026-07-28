import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles empty thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError, 'thresholds must contain at least one threshold');
});

test('classify throws when thresholds is not an object', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError, 'thresholds must be a non-empty object');
  assert.throws(() => perception.classify([1, 2, 3], 123), TypeError, 'thresholds must be a non-empty object');
});

test('classify throws for invalid thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], { low: NaN }), TypeError, 'threshold for category low must be a finite number');
  assert.throws(() => perception.classify([1, 2, 3], { high: Infinity }), TypeError, 'threshold for category high must be a finite number');
});

// Add other relevant tests for detect and filter methods here.