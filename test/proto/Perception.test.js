import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify filters inputs into categories based on thresholds', () => {
  const inputs = [1, 5, 10, 15];
  const categories = { low: 5, medium: 10, high: 15 };
  const classified = perception.classify(inputs, categories);
  assert.deepEqual(classified, {
    low: [5, 10, 15],
    medium: [10, 15],
    high: [15]
  });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 5 }), TypeError);
});

test('classify throws on invalid categories object', () => {
  assert.throws(() => perception.classify([1, 2], null), TypeError);
  assert.throws(() => perception.classify([1, 2], []), TypeError);
});

test('classify throws on empty categories object', () => {
  assert.throws(() => perception.classify([1, 2], {}), TypeError);
});

test('classify throws on invalid threshold', () => {
  const categories = { invalid: 'not-a-number' };
  assert.throws(() => perception.classify([1, 2], categories), TypeError);
});

