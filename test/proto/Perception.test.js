import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs by type', () => {
  const inputs = [1, 'text', true, null, [], {}];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    number: [1],
    string: ['text'],
    boolean: [true],
    object: [null, [], {}]
  });
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs handles empty array', () => {
  const categorized = perception.categorizeSensoryInputs([]);
  assert.deepEqual(categorized, {});
});

test('perceiveMultiple handles errors properly', async () => {
  const inputs = [
    { input: '', urgency: 1 },  // Invalid input
    { input: 'valid', urgency: 2 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 1); // only valid input should be processed
});

