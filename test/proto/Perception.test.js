import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('batchProcess categorizes and enhances sensory inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' },
    { type: 'olfactory', data: 'smell1' }
  ];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 3);
  assert.equal(result[0].category, 'visual');
  assert.equal(result[0].context, 'sight context');
  assert.equal(result[1].category, 'auditory');
  assert.equal(result[1].context, 'sound context');
  assert.equal(result[2].category, 'olfactory');
  assert.equal(result[2].context, 'smell context');
});

// Add more tests as needed
