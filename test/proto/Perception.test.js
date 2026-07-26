import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify correctly categorizes sensory inputs', () => {
  const inputs = [0.1, 0.5, 1.5, 2.0];
  const categories = { low: 0.5, high: 1.0 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [0.5, 1.5, 2.0], high: [1.5, 2.0] });
});

test('classify throws on empty inputs', () => {
  assert.throws(() => perception.classify([], { low: 0.5 }), TypeError);
});

test('classify throws on invalid categories', () => {
  assert.throws(() => perception.classify([0.5], null), TypeError);
  assert.throws(() => perception.classify([0.5], {}), TypeError);
  assert.throws(() => perception.classify([0.5], { low: 'notANumber' }), TypeError);
});

