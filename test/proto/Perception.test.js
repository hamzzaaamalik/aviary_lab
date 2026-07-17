import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['hello', 123, { key: 'value' }, null, true];
  const expected = {
    strings: ['hello'],
    numbers: [123],
    objects: [{ key: 'value' }],
    others: [null, true]
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws TypeError for invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(null), TypeError);
});

test('perceiveMultiple handles edge cases', async () => {
  const inputs = [
    { input: 'test', urgency: 3 },
    { input: '', urgency: 1 },
    { input: 'hello', urgency: 6 },
    { input: 'world', urgency: 2 }
  ];
  const results = await perception.perceiveMultiple(inputs);
  assert.equal(results.length, 2); // Valid inputs only
});
