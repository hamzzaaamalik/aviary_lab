import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes valid inputs', () => {
  const inputs = [1, 'text', true, { key: 'value' }];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    number: [1],
    string: ['text'],
    boolean: [true],
    object: [{ key: 'value' }]
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('validateInputs accepts valid inputs', () => {
  const validInputs = [1, 'test', false, { a: 1 }];
  assert.doesNotThrow(() => perception.validateInputs(validInputs));
});

test('validateInputs throws on unsupported input type', () => {
  const invalidInputs = [1, 'test', Symbol('symbol')];
  assert.throws(() => perception.validateInputs(invalidInputs), TypeError);
});

