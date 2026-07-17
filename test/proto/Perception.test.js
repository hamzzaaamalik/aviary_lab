import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

test('categorizeErrors categorizes error messages by type', () => {
  const errors = [
    'TypeError: Invalid input type',
    'TypeError: Expected an array',
    'ReferenceError: x is not defined',
    'TypeError: Another error'
  ];

  const categorized = perception.categorizeErrors(errors);
  assert.deepEqual(categorized, {
    'TypeError': [
      'TypeError: Invalid input type',
      'TypeError: Expected an array',
      'TypeError: Another error'
    ],
    'ReferenceError': ['ReferenceError: x is not defined']
  });
});

test('categorizeErrors handles an empty array', () => {
  const result = perception.categorizeErrors([]);
  assert.deepEqual(result, {});
});

