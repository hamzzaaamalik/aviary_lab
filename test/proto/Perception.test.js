import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes valid inputs', () => {
  const result = perception.categorizeSensoryInputs(['text', 42, true, null]);
  assert.deepEqual(result, {
    string: ['text'],
    number: [42],
    boolean: [true],
    object: [null],
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs returns empty object for empty array', () => {
  assert.deepEqual(perception.categorizeSensoryInputs([]), {});
});

test('validateInput throws on invalid types', () => {
  assert.throws(() => perception.validateInput(undefined), TypeError);
  assert.throws(() => perception.validateInput(Symbol()), TypeError);
});

test('process handles mixed valid and invalid inputs', () => {
  const result = perception.process(['valid', 123, null, undefined, true]);
  assert.deepEqual(result.categorized, {
    string: ['valid'],
    number: [123],
    object: [null],
    boolean: [true],
  });
  assert.deepEqual(result.errors, ['Invalid input type: undefined. Expected one of: string, number, object, boolean, function']);
});

