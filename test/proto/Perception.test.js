import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes valid inputs', () => {
  const result = perception.categorizeSensoryInputs([1, "test", true, null]);
  assert.deepEqual(result, { number: [1], string: ["test"], boolean: [true], object: [null] });
});

test('categorizeSensoryInputs throws TypeError for non-array inputs', () => {
  assert.throws(() => perception.categorizeSensoryInputs("not an array"), TypeError);
});

test('validateInput throws TypeError for invalid input types', () => {
  assert.throws(() => perception.validateInput(Symbol()), TypeError);
});

test('process returns categorized inputs and errors', () => {
  const result = perception.process([1, "test", Symbol()]);
  assert.deepEqual(result.categorized, { number: [1], string: ["test"] });
  assert.deepEqual(result.errors, ["Invalid input type: symbol. Expected one of: string, number, object, boolean, undefined, function"]);
});

test('processWithErrors returns categorized inputs and categorized errors', () => {
  const result = perception.processWithErrors([1, "test", Symbol()]);
  assert.deepEqual(result.categorized, { number: [1], string: ["test"] });
  assert.deepEqual(result.errors, ["Invalid input type: symbol. Expected one of: string, number, object, boolean, undefined, function"]);
  assert.deepEqual(result.categorizedErrors, {
    'Invalid input type': ["Invalid input type: symbol. Expected one of: string, number, object, boolean, undefined, function"]
  });
});
