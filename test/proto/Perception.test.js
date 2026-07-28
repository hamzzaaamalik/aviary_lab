import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify returns categorized inputs based on thresholds', () => {
  const inputs = [1, 2, 3, 4];
  const thresholds = { low: 2, high: 3 };  
  const result = perception.classify(inputs, thresholds);
  assert.deepEqual(result, { low: [2, 3, 4], high: [3, 4] });
});

test('classify throws on non-numeric thresholds', () => {
  const inputs = [1, 2, 3];
  const thresholds = { low: 'two' };
  assert.throws(() => perception.classify(inputs, thresholds), TypeError);
});

test('classify throws on empty thresholds', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.classify(inputs, {}), TypeError);
});

test('classify returns empty object for empty inputs', () => {
  const result = perception.classify([], { low: 1 });
  assert.deepEqual(result, {});
});

test('checkInputs throws on invalid input', () => {
  assert.throws(() => perception.checkInputs(null), TypeError);
  assert.throws(() => perception.checkInputs([1, '2', 3]), TypeError);
});
