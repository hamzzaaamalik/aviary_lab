import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive throws TypeError for non-string input', async () => {
  await assert.rejects(() => perception.perceive(123, 3), { name: 'TypeError' });
});

test('perceive throws TypeError for out of bounds urgency', async () => {
  await assert.rejects(() => perception.perceive('test', 0), { name: 'TypeError' });
  await assert.rejects(() => perception.perceive('test', 6), { name: 'TypeError' });
});

test('categorizeInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeInputs('not an array'), TypeError);
});

test('categorizeInputs throws TypeError for non-string elements', () => {
  assert.throws(() => perception.categorizeInputs(['see something', 42]), TypeError);
});

test('categorizeInputs categorizes inputs correctly', () => {
  const input = ['see a tree', 'hear a sound', 'feel the ground'];
  const result = perception.categorizeInputs(input);
  assert.deepEqual(result, {
    visual: ['see a tree'],
    auditory: ['hear a sound'],
    tactile: ['feel the ground'],
    other: []
  });
});
