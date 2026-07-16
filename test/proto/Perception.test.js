import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes correctly', () => {
  const inputs = ['visual:tree', 'auditory:bird', 'visual:sky'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    visual: ['visual:tree', 'visual:sky'],
    auditory: ['auditory:bird']
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('invalid'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('categorizeSensoryInputs throws on empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('perceiveMultiple handles promise rejections properly', async () => {
  const inputs = [
    { input: 'valid:input', urgency: 3 },
    { input: '', urgency: 1 }, // invalid
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 1); // Only valid input should be processed
});
