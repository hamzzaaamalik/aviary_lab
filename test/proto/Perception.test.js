import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['http://example.com', 'just some text', 'https://another.com'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    url: ['http://example.com', 'https://another.com'],
    text: ['just some text']
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('perceiveMultiple handles invalid inputs', async () => {
  const inputs = [{ input: 'valid input', urgency: 5 }, { input: 123, urgency: 3 }];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 1); // Only one valid input should be processed
});

test('perceiveMultiple processes valid inputs', async () => {
  const inputs = [{ input: 'input one', urgency: 1 }, { input: 'input two', urgency: 2 }];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2); // Both valid inputs should be processed
  assert.equal(results[0].processed, 'Percept from: input two');
  assert.equal(results[1].processed, 'Percept from: input one');
});