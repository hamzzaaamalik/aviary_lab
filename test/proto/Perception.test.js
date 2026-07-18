import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes valid inputs correctly', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
});

test('categorizeSensoryInput throws for invalid inputs', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(123), TypeError);
});

test('process categorizes input correctly', () => {
  assert.equal(perception.process({ sight: true }), 'visual');
});

test('process throws for null or undefined', () => {
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.process(undefined), TypeError);
});

test('processMultiple categorizes multiple inputs', () => {
  const inputs = [{ sight: true }, { sound: true }];
  assert.deepEqual(perception.processMultiple(inputs), ['visual', 'auditory']);
});

test('processMultiple throws for invalid input type', () => {
  assert.throws(() => perception.processMultiple(null), TypeError);
});

test('validateAndCategorize processes and categorizes data', () => {
  const data = [{ sight: true }, { sound: true }];
  const result = perception.validateAndCategorize(data);
  assert.deepEqual(result, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
  ]);
});

test('validateAndCategorize throws for non-array input', () => {
  assert.throws(() => perception.validateAndCategorize(null), TypeError);
});
