import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive handles valid input', async () => {
  const result = await perception.perceive('test input', 3);
  assert.deepEqual(result, { processed: 'Percept from: test input', urgency: 3 });
});

test('perceive throws on invalid input', async () => {
  await assert.rejects(
    () => perception.perceive('', 3),
    { message: 'input must be a non-empty string' }
  );
  await assert.rejects(
    () => perception.perceive('test', 6),
    { message: 'urgency must be a number between 1 and 5' }
  );
});

test('perceiveMultiple processes multiple inputs', async () => {
  const inputs = [
    { input: 'input one', urgency: 1 },
    { input: 'input two', urgency: 5 },
    { input: 'input three', urgency: 3 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 3);
});

test('perceiveMultiple handles invalid inputs gracefully', async () => {
  const inputs = [
    { input: 'valid input', urgency: 1 },
    { input: '', urgency: 3 },
    { input: 'another valid', urgency: 6 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 1);
});

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [1, 'string', true, null, 42];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    number: [1, 42],
    string: ['string'],
    boolean: [true],
    object: [null]
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});