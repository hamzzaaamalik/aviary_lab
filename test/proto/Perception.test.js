import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('perceive throws on invalid input', async () => {
  await assert.rejects(() => perception.perceive('', 1), { message: 'input must be a non-empty string' });
  await assert.rejects(() => perception.perceive('test', 6), { message: 'urgency must be a number between 1 and 5' });
});

test('perceiveMultiple throws on invalid inputs', async () => {
  await assert.rejects(() => perception.perceiveMultiple('not an array'), { message: 'inputs must be an array' });
  await assert.rejects(() => perception.perceiveMultiple([], null), { message: 'inputs array must not be empty' });
});

test('perceiveMultiple handles edge cases', async () => {
  const inputs = [
    { input: 'normal input', urgency: 1 },
    { input: 'warning input', urgency: 5 },
    { input: 'another normal input', urgency: 3 }
  ];
  const result = await perception.perceiveMultiple(inputs);
  assert.deepEqual(result, [
    { processed: 'Percept from: warning input', urgency: 5 },
    { processed: 'Percept from: another normal input', urgency: 3 },
    { processed: 'Percept from: normal input', urgency: 1 }
  ]);
});

test('categorizeSensoryInputs categorizes correctly', () => {
  const inputs = ['normal input', 'warning input', 'another normal input'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    normal: ['normal input', 'another normal input'],
    warning: ['warning input']
  });
});

test('categorizeSensoryInputs throws on invalid inputs', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid input', 123]), { message: 'all inputs must be strings' });
});
