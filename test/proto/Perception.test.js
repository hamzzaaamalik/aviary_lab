import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['string', 123, true, 'another string'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    string: ['string', 'another string'],
    number: [123],
    boolean: [true],
  });
});

test('categorizeSensoryInputs handles empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, {});
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('validateSensoryInput handles invalid input', () => {
  assert.throws(() => perception.validateSensoryInput('', 3), TypeError);
  assert.throws(() => perception.validateSensoryInput('valid', 6), TypeError);
  assert.throws(() => perception.validateSensoryInput('valid', 'not a number'), TypeError);
});
