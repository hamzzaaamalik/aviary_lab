import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['I see a bird', 'I hear music', 'I feel the breeze', 'Just a thought'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    visual: ['I see a bird'],
    auditory: ['I hear music'],
    tactile: ['I feel the breeze'],
    other: ['Just a thought'],
  });
});

test('categorizeSensoryInputs throws on empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), { message: 'inputs array must not be empty' });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), { message: 'inputs must be an array' });
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), { message: 'input must be a string' });
});

test('perceiveMultiple processes multiple inputs correctly', async () => {
  const inputs = [
    { input: 'I see a bird', urgency: 5 },
    { input: 'I hear music', urgency: 3 },
  ];
  const result = await perception.perceiveMultiple(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].processed, 'Percept from: I see a bird');
  assert.equal(result[0].urgency, 5);
});

test('perceiveMultiple throws on invalid input', async () => {
  const inputs = [{ input: 'I see a bird', urgency: 5 }, { input: 123, urgency: 3 }];
  await assert.rejects(() => perception.perceiveMultiple(inputs), { message: 'input must be a string' });
});

test('perceiveMultiple returns empty array for empty input', async () => {
  const result = await perception.perceiveMultiple([]);
  assert.deepEqual(result, []);
});
