import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process enhances sensory inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].context, 'sight context');
  assert.equal(result[1].context, 'sound context');
});

test('batchProcess processes and enhances inputs', () => {
  const inputs = [
    { type: 'tactile', data: 'touch1' },
    { type: 'visual', data: 'image2' }
  ];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].context, 'touch context');
  assert.equal(result[1].context, 'sight context');
});
