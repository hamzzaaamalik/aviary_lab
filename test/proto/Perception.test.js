import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs with valid array', () => {
  const result = perception.categorizeSensoryInputs(['a', 1, true, null]);
  assert.deepEqual(result, {
    string: ['a'],
    number: [1],
    boolean: [true],
    object: [null]
  });
});

test('categorizeSensoryInputs throws TypeError on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError,
    'Expected an array for inputs, received string');
});

test('validateInput throws TypeError on invalid input type', () => {
  assert.throws(() => perception.validateInput(Symbol()), TypeError,
    'Invalid input type: symbol. Expected one of: string, number, object, boolean, undefined, function');
});

test('processWithValidation returns errors for invalid inputs', () => {
  const result = perception.processWithValidation(['valid', 42, Symbol()]);
  assert.deepEqual(result.errors, ['Invalid input type: symbol. Expected one of: string, number, object, boolean, undefined, function']);
  assert.deepEqual(result.categorized, {
    string: ['valid'],
    number: [42]
  });
});

test('processWithValidation handles empty input', () => {
  const result = perception.processWithValidation([]);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.categorized, {});
});
