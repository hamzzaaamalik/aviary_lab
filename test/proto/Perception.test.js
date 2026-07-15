import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeInputs handles strings, non-strings, and empty inputs', () => {
  const inputs = ['see a cat', 'hear a dog', ''];
  const result = perception.categorizeInputs(inputs);
  assert.deepEqual(result, {
    visual: ['see a cat'],
    auditory: ['hear a dog'],
    tactile: [],
    other: ['']
  });
});

test('categorizeInputs handles non-string types', () => {
  const inputs = ['see a cat', 42, null, undefined, { key: 'value' }];
  const result = perception.categorizeInputs(inputs);
  assert.deepEqual(result, {
    visual: ['see a cat'],
    auditory: [],
    tactile: [],
    other: [42, null, undefined, { key: 'value' }]
  });
});

test('validateSensoryInput throws for non-string input', () => {
  assert.throws(() => perception.validateSensoryInput(42, 3), TypeError);
});

test('validateSensoryInput throws for out of bounds urgency', () => {
  assert.throws(() => perception.validateSensoryInput('test', 6), TypeError);
});

