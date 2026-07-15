import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('perceiveBatch processes multiple inputs with same urgency', async () => {
  const perception = new Perception();
  const inputs = ['input1', 'input2', 'input3'];
  const urgency = 3;
  const results = await perception.perceiveBatch(urgency, inputs);
  assert.equal(results.length, 3);
  results.forEach(result => {
    assert.equal(result.urgency, urgency);
    assert.match(result.processed, /Percept from:/);
  });
});

test('perceiveBatch throws on invalid urgency', async () => {
  const perception = new Perception();
  const inputs = ['input1', 'input2'];
  await assert.rejects(() => perception.perceiveBatch(6, inputs), {
    message: 'urgency must be a number between 1 and 5'
  });
});

test('perceiveBatch throws on non-array inputs', async () => {
  const perception = new Perception();
  await assert.rejects(() => perception.perceiveBatch(3, 'not an array'), {
    message: 'inputs must be an array'
  });
});

