import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive processes valid input', async () => {
  const result = await perception.perceive('hello', 3);
  assert.deepEqual(result, { processed: 'Percept from: hello', urgency: 3 });
});

test('perceive throws on invalid input', async () => {
  await assert.rejects(() => perception.perceive('', 3), { message: 'input must be a non-empty string' });
  await assert.rejects(() => perception.perceive(123, 3), { message: 'input must be a non-empty string' });
  await assert.rejects(() => perception.perceive('hello', 6), { message: 'urgency must be a number between 1 and 5' });
  await assert.rejects(() => perception.perceive('hello', 0), { message: 'urgency must be a number between 1 and 5' });
});

test('perceiveMultiple processes multiple valid inputs', async () => {
  const inputs = [ { input: 'input1', urgency: 1 }, { input: 'input2', urgency: 2 } ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2);
});

test('perceiveMultiple handles errors gracefully', async () => {
  const inputs = [ { input: '', urgency: 1 }, { input: 'input2', urgency: 2 } ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 1);
});

test('categorizeSensoryInputs categorizes inputs by type', () => {
  const inputs = ['string', 123, true, null];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    string: ['string'],
    number: [123],
    boolean: [true],
    object: [null]
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), { message: 'inputs must be an array' });
});

