import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processWithDetails returns category and input', () => {
  const input = { sight: true };
  const result = perception.processWithDetails(input);
  assert.deepEqual(result, { category: 'visual', input });
});

test('processWithDetails throws on null input', () => {
  assert.throws(() => perception.processWithDetails(null), TypeError);
});

test('processWithDetails throws on undefined input', () => {
  assert.throws(() => perception.processWithDetails(undefined), TypeError);
});

// Additional tests for existing methods

test('categorizeSensoryInput categorizes visual input', () => {
  const result = perception.categorizeSensoryInput({ sight: true });
  assert.equal(result, 'visual');
});

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
});

test('process returns category for valid sensory data', () => {
  const result = perception.process({ sound: true });
  assert.equal(result, 'auditory');
});

test('process throws on null data', () => {
  assert.throws(() => perception.process(null), TypeError);
});

// Additional tests for handleSingleInput and handleMultipleInputs

test('handleSingleInput returns category for valid input', () => {
  const result = perception.handleSingleInput({ smell: true });
  assert.equal(result, 'olfactory');
});

