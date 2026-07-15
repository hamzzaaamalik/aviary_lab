import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive with valid input', async () => {
  const percept = await perception.perceive('see a cat', 5);
  assert.deepEqual(percept, { processed: 'Percept from: see a cat', urgency: 5 });
});

test('perceive throws TypeError for invalid urgency', async () => {
  await assert.rejects(
    () => perception.perceive('see a cat', 6),
    { message: 'urgency must be a number between 1 and 5' }
  );
  await assert.rejects(
    () => perception.perceive('see a cat', 0),
    { message: 'urgency must be a number between 1 and 5' }
  );
});

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const categorized = perception.categorizeSensoryInputs([
    'see a bird',
    'hear a sound',
    'feel the heat',
    'unknown input',
  ]);
  assert.deepEqual(categorized, {
    visual: ['see a bird'],
    auditory: ['hear a sound'],
    tactile: ['feel the heat'],
    other: ['unknown input'],
  });
});

test('validateSensoryInput throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.validateSensoryInput(123, 3), TypeError);
  assert.throws(() => perception.validateSensoryInput('see a cat', 6), TypeError);
  assert.throws(() => perception.validateSensoryInput('see a cat', 0), TypeError);
});

