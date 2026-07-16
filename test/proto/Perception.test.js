import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes valid inputs', () => {
  const inputs = ['light', 'sound', 'smell'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {'string': ['light', 'sound', 'smell']});
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on invalid item type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

// New tests for perceiveMultiple edge cases

test('perceiveMultiple throws on non-array input', async () => {
  await assert.rejects(() => perception.perceiveMultiple('not an array'), TypeError);
});

test('perceiveMultiple returns empty array for empty input', async () => {
  const result = await perception.perceiveMultiple([]);
  assert.deepEqual(result, []);
});

test('perceiveMultiple processes valid inputs correctly', async () => {
  const inputs = [
    { input: 'light', urgency: 3 },
    { input: 'sound', urgency: 5 },
    { input: 'smell', urgency: 2 }
  ];
  const result = await perception.perceiveMultiple(inputs);
  assert.equal(result.length, 3);
  assert.equal(result[0].processed, 'Percept from: sound'); // highest urgency first
  assert.equal(result[1].processed, 'Percept from: light');
  assert.equal(result[2].processed, 'Percept from: smell');
});

test('perceiveMultiple throws on invalid input structure', async () => {
  const inputs = [
    { input: 'valid', urgency: 1 },
    { input: 123, urgency: 2 }
  ];
  await assert.rejects(() => perception.perceiveMultiple(inputs), TypeError);
});

// Tests for validateSensoryInput

test('validateSensoryInput throws on empty input string', () => {
  assert.throws(() => perception.validateSensoryInput('', 1), TypeError);
});

test('validateSensoryInput throws on invalid urgency', () => {
  assert.throws(() => perception.validateSensoryInput('valid', 0), TypeError);
  assert.throws(() => perception.validateSensoryInput('valid', 6), TypeError);
});
