import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['hello', 42, true, null, 'world'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    string: ['hello', 'world'],
    number: [42],
    boolean: [true],
    object: [null]
  });
});


test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(null), TypeError);
});


test('perceiveMultiple handles invalid inputs gracefully', async () => {
  const inputs = [
    { input: 'valid input', urgency: 1 },
    { input: '', urgency: 2 },
    { input: 'another valid input', urgency: 3 }
  ];
  const percepts = await perception.perceiveMultiple(inputs);
  assert.equal(percepts.length, 2); // Only valid inputs should be processed
});
