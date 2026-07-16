import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['audio:sound1', 'video:clip1', 'text:example'];
  const expected = {
    audio: ['audio:sound1'],
    video: ['video:clip1'],
    text: ['text:example'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws for invalid inputs', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('perceiveMultiple handles invalid input gracefully', async () => {
  const inputs = [
    { input: 'valid input', urgency: 3 },
    { input: 123, urgency: 1 },
    { input: 'another valid input', urgency: 4 },
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2);
});

test('perceiveMultiple returns empty array for empty input', async () => {
  const results = await perception.perceiveMultiple([]);
  assert.deepEqual(results, []);
});

