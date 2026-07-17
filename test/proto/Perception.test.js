import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive processes valid input', async () => {
  const result = await perception.perceive('test input', 3);
  assert.deepEqual(result, { processed: 'Percept from: test input', urgency: 3 });
});

test('perceive throws TypeError on invalid input', async () => {
  await assert.rejects(() => perception.perceive('', 3), { message: 'input must be a non-empty string' });
  await assert.rejects(() => perception.perceive('test input', 6), { message: 'urgency must be a number between 1 and 5' });
});

test('perceiveMultiple processes multiple inputs', async () => {
  const inputs = [
    { input: 'first', urgency: 2 },
    { input: 'second', urgency: 1 },
    { input: 'third', urgency: 5 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.deepEqual(results, [
    { processed: 'Percept from: third', urgency: 5 },
    { processed: 'Percept from: first', urgency: 2 },
    { processed: 'Percept from: second', urgency: 1 }
  ]);
});

test('perceiveMultiple handles invalid inputs gracefully', async () => {
  const inputs = [
    { input: 'valid', urgency: 3 },
    { input: '', urgency: 1 },
    { input: 'another', urgency: 6 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 1);
  assert.deepEqual(results[0], { processed: 'Percept from: valid', urgency: 3 });
});

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [1, 'string', true, null, { key: 'value' }];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    number: [1],
    string: ['string'],
    boolean: [true],
    object: [null, { key: 'value' }]
  });
});

test('categorizeSensoryInputs throws TypeError on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), { message: 'inputs must be an array' });
});
