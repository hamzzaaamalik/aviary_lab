import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateAndCategorize processes valid data correctly', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { smell: true },
    { taste: true },
    { touch: true }
  ];
  const result = perception.validateAndCategorize(inputs);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { smell: true }, category: 'olfactory' },
    { input: { taste: true }, category: 'gustatory' },
    { input: { touch: true }, category: 'tactile' }
  ]);
});

test('validateAndCategorize throws on non-array input', () => {
  assert.throws(() => perception.validateAndCategorize(null), TypeError);
  assert.throws(() => perception.validateAndCategorize({}), TypeError);
});

test('validateAndCategorize handles unknown sensory input', () => {
  const inputs = [{ unknown: true }];
  const result = perception.validateAndCategorize(inputs);
  assert.deepEqual(result, [{ input: { unknown: true }, category: 'unknown' }]);
});

