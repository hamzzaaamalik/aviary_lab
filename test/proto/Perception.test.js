import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify empty inputs throws error', () => {
  assert.throws(() => perception.classify([], { a: 1 }), TypeError, 'Sensory inputs cannot be empty.');
});

test('classify with invalid categories throws error', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'not-an-object'), TypeError, 'Categories must be an object.');
});

test('classify with empty categories throws error', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError, 'Categories cannot be an empty object.');
});

test('classify with invalid threshold throws error', () => {
  assert.throws(() => perception.classify([1, 2, 3], { a: 'not-a-number' }), TypeError, 'Threshold for a must be a finite number.');
});

test('classify correctly categorizes inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const categories = { low: 2, high: 4 };
  const result = perception.classify(inputs, categories);
  assert.deepEqual(result, { low: [2, 3, 4, 5], high: [4, 5] });
});

test('classifyWithRanges categorizes inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const ranges = { low: [1, 2], high: [3, 5] };
  const result = perception.classifyWithRanges(inputs, ranges);
  assert.deepEqual(result, { low: [1, 2], high: [3, 4, 5] });
});

