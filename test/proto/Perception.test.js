import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['I see a cat', 'I hear a dog', 'I feel the wind', 'a random thought'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    visual: ['I see a cat'],
    auditory: ['I hear a dog'],
    tactile: ['I feel the wind'],
    other: ['a random thought']
  });
});

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws TypeError for non-string elements', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('perceive processes input correctly', async () => {
  const percept = await perception.perceive('I see a bird', 5);
  assert.deepEqual(percept, { processed: 'Percept from: I see a bird', urgency: 5 });
});

test('perceiveMultiple processes multiple inputs correctly', async () => {
  const inputs = [
    { input: 'I see a tree', urgency: 3 },
    { input: 'I hear a car', urgency: 2 }
  ];
  const percepts = await perception.perceiveMultiple(inputs);
  assert.equal(percepts.length, 2);
});

test('perceiveMultiple throws TypeError for invalid input', async () => {
  await assert.rejects(() => perception.perceiveMultiple('invalid'), TypeError);
});
