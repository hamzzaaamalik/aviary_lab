import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['audio:track1', 'audio:track2', 'visual:image1', 'visual:image2'];
  const expected = {
    audio: ['audio:track1', 'audio:track2'],
    visual: ['visual:image1', 'visual:image2']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input', () => {
  const inputs = ['audio:track1', 123, 'visual:image1'];
  assert.throws(() => perception.categorizeSensoryInputs(inputs), TypeError);
});

test('categorizeSensoryInputs throws on empty input array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

// Additional tests for existing methods...

// Testing perceive method with valid input
test('perceive processes valid input correctly', async () => {
  const result = await perception.perceive('sound', 3);
  assert.deepEqual(result, { processed: 'Percept from: sound', urgency: 3 });
});

// Testing perceive method with invalid input
test('perceive throws on invalid input', async () => {
  await assert.rejects(() => perception.perceive('', 3), TypeError);
  await assert.rejects(() => perception.perceive('sound', 6), TypeError);
});

// Testing perceiveMultiple with valid inputs
test('perceiveMultiple processes multiple inputs correctly', async () => {
  const inputs = [
    { input: 'sound1', urgency: 2 },
    { input: 'sound2', urgency: 3 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2);
});
