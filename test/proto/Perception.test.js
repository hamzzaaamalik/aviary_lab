import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process categorizes and enhances sensory inputs', () => {
  const inputs = [
    { type: 'sound', data: 'whistle' },
    { type: 'image', data: 'picture' },
  ];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'sound', context: 'auditory context' },
    { input: inputs[1], category: 'image', context: 'visual context' },
  ]);
});

test('process throws for invalid input type', () => {
  assert.throws(() => perception.process('not an array'), TypeError);
});

test('process throws for invalid input category', () => {
  const inputs = [{ type: 'unknown', data: 'data' }];
  assert.throws(() => perception.process(inputs), TypeError);
});

test('enhanceContext throws for invalid categorized data', () => {
  assert.throws(() => perception.enhanceContext('not an array'), TypeError);
});

