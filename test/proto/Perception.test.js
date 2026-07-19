import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('batchProcess categorizes and enhances sensory inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' }
  ];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].category, 'visual');
  assert.equal(result[1].category, 'auditory');
  assert.equal(result[0].context, 'sight context');
  assert.equal(result[1].context, 'sound context');
});

test('batchProcess throws error for non-array input', () => {
  assert.throws(() => perception.batchProcess('not an array'), TypeError);
});

test('batchProcess throws error for invalid input object', () => {
  const inputs = [
    { data: 'no type' }
  ];
  assert.throws(() => perception.batchProcess(inputs), TypeError);
});
