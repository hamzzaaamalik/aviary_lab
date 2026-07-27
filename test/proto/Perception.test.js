import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect throws TypeError when threshold is not a number', () => {
  assert.throws(() => perception.detect([1, 2, 3], 'notANumber'), TypeError);
});

test('detect throws TypeError when inputs are invalid', () => {
  assert.throws(() => perception.detect('notAnArray', 2), TypeError);
  assert.throws(() => perception.detect([1, 2, 'notANumber'], 1), TypeError);
});

test('filter throws TypeError when predicate is not a function', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'notAFunction'), TypeError);
});

test('classify throws TypeError when thresholds are invalid', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'notAnObject'), TypeError);
  assert.throws(() => perception.classify([1, 2, 3], { low: 'notANumber' }), TypeError);
});

test('classify throws TypeError when inputs are invalid', () => {
  assert.throws(() => perception.classify('notAnArray', { low: 1 }), TypeError);
  assert.throws(() => perception.classify([1, 2, 'notANumber'], { low: 1 }), TypeError);
});
