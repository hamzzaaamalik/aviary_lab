import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws for empty categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], {}), TypeError, 'Categories cannot be an empty object.');
});

test('classify throws for null categories', () => {
  assert.throws(() => perception.classify([1, 2, 3], null), TypeError, 'Categories must be an object.');
});

// Additional tests for classify() can be added here.