import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound of rain', 'sight of sunset', 'touch of warmth', 'unknown sensation'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    auditory: ['sound of rain'],
    visual: ['sight of sunset'],
    tactile: ['touch of warmth'],
    other: ['unknown sensation']
  });
});

test('categorizeSensoryInputs throws for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});


test('categorizeSensoryInputs throws for empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});


test('categorizeSensoryInputs throws for invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});


test('perceive throws for invalid input type', async () => {
  await assert.rejects(() => perception.perceive(123, 1), { name: 'TypeError' });
});


test('perceive throws for invalid urgency', async () => {
  await assert.rejects(() => perception.perceive('valid input', 6), { name: 'TypeError' });
});


test('perceive processes input correctly', async () => {
  const result = await perception.perceive('valid input', 3);
  assert.deepEqual(result, { processed: 'Percept from: valid input', urgency: 3 });
});


test('perceiveMultiple throws for invalid input type', async () => {
  await assert.rejects(() => perception.perceiveMultiple(123), { name: 'TypeError' });
});


test('perceiveMultiple processes multiple inputs correctly', async () => {
  const inputs = [
    { input: 'input 1', urgency: 1 },
    { input: 'input 2', urgency: 2 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2);
  assert.deepEqual(results[0], { processed: 'Percept from: input 2', urgency: 2 });
  assert.deepEqual(results[1], { processed: 'Percept from: input 1', urgency: 1 });
});


test('perceiveMultiple handles errors and continues', async () => {
  const inputs = [
    { input: '', urgency: 1 }, // Invalid input
    { input: 'valid input', urgency: 2 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 1);
  assert.deepEqual(results[0], { processed: 'Percept from: valid input', urgency: 2 });
});
