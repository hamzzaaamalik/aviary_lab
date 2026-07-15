import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('filterInputs filters valid sensory inputs', () => {
  const perception = new Perception();
  const inputs = ['input1', 'input2', 'input3'];
  const criteria = input => input.includes('1');
  const result = perception.filterInputs(inputs, criteria);
  assert.deepEqual(result, ['input1']);
});

test('filterInputs throws on invalid inputs', () => {
  const perception = new Perception();
  assert.throws(() => perception.filterInputs('not an array', () => true), TypeError);
});

test('perceiveMultiple processes filtered inputs', async () => {
  const perception = new Perception();
  const inputs = [
    { input: 'input1', urgency: 1 },
    { input: 'input2', urgency: 3 },
    { input: 'input3', urgency: 5 }
  ];
  const filtered = perception.filterInputs(inputs, input => input.urgency >= 3);
  const percepts = await perception.perceiveMultiple(filtered);
  assert.equal(percepts.length, 2);
});

test('perceive throws error on invalid urgency', async () => {
  const perception = new Perception();
  await assert.rejects(
    () => perception.perceive('valid input', 6),
    { message: 'urgency must be a number between 1 and 5' }
  );
});

