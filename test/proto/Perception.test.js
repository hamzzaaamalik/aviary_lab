import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify handles empty inputs gracefully', () => {
  const result = perception.classify([], { high: 10, low: 5 });
  assert.deepEqual(result, { high: [], low: [] });
});

test('classify throws on non-object thresholds', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], 123), TypeError);
});

// existing tests for other methods...

