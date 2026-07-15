import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['see a tree', 'hear a bird', 'feel the wind'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    visual: ['see a tree'],
    auditory: ['hear a bird'],
    tactile: ['feel the wind'],
    other: [],
  });
});

test('perceiveAndCategorize processes and categorizes inputs', async () => {
  const inputs = [
    { input: 'see a sunset', urgency: 5 },
    { input: 'hear thunder', urgency: 3 },
    { input: 'feel grass', urgency: 4 },
  ];
  const result = await perception.perceiveAndCategorize(inputs);
  assert.equal(result.percepts.length, 3);
  assert.deepEqual(result.categories, {
    visual: ['see a sunset'],
    auditory: ['hear thunder'],
    tactile: ['feel grass'],
    other: [],
  });
});

// Additional tests for input validation if necessary
