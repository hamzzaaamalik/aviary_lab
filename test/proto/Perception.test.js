import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    'I see a bird',
    'I hear a song',
    'I feel the wind',
    'This is just text',
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    visual: ['I see a bird'],
    auditory: ['I hear a song'],
    tactile: ['I feel the wind'],
    other: ['This is just text'],
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('validateSensoryInput throws on invalid input type', () => {
  assert.throws(() => perception.validateSensoryInput(123, 3), TypeError);
});

test('validateSensoryInput throws on invalid urgency', () => {
  assert.throws(() => perception.validateSensoryInput('valid', 6), TypeError);
  assert.throws(() => perception.validateSensoryInput('valid', 0), TypeError);
  assert.throws(() => perception.validateSensoryInput('valid', 'not a number'), TypeError);
});
