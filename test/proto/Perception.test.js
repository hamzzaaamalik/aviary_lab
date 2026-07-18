import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateAndCategorize categorizes valid inputs correctly', () => {
  const inputs = [{ sight: true }, { sound: true }, { smell: true }];
  const results = perception.validateAndCategorize(inputs);
  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { smell: true }, category: 'olfactory' }
  ]);
});

test('validateAndCategorize throws on invalid input', () => {
  assert.throws(() => perception.validateAndCategorize(null), TypeError);
  assert.throws(() => perception.validateAndCategorize('not an array'), TypeError);
});

test('validateAndCategorize handles unknown inputs', () => {
  const inputs = [{ unknown: true }];
  const results = perception.validateAndCategorize(inputs);
  assert.deepEqual(results, [
    { input: { unknown: true }, category: 'unknown' }
  ]);
});

