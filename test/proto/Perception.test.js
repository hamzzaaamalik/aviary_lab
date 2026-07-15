import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeInputs correctly categorizes inputs', () => {
  const inputs = ['I can see the sky', 'I hear music', 'I feel cold', 'I smell something'];
  const result = perception.categorizeInputs(inputs);
  assert.deepEqual(result, {
    visual: ['I can see the sky'],
    auditory: ['I hear music'],
    tactile: ['I feel cold'],
    other: ['I smell something'],
  });
});

test('categorizeInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeInputs('not an array'), TypeError);
});

test('categorizeInputs throws on invalid item types', () => {
  assert.throws(() => perception.categorizeInputs(['valid', 123]), TypeError);
});

test('perceiveMultiple handles empty input array', async () => {
  const result = await perception.perceiveMultiple([]);
  assert.deepEqual(result, []);
});

test('perceiveMultiple throws on invalid input structure', async () => {
  await assert.rejects(() => perception.perceiveMultiple([{ input: 123, urgency: 1 }]), TypeError);
});

// Additional edge case tests

test('perceiveMultiple processes valid inputs', async () => {
  const inputs = [
    { input: 'I see a bird', urgency: 2 },
    { input: 'I hear a sound', urgency: 1 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2);
  assert.equal(results[0].processed, 'Percept from: I see a bird');
  assert.equal(results[1].processed, 'Percept from: I hear a sound');
});
