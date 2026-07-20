import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('Process sensory inputs correctly', () => {
  const inputs = [
    { type: 'visual', data: 'image data' },
    { type: 'auditory', data: 'sound data' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].context, 'sight based on visual input');
  assert.equal(result[1].context, 'sound based on auditory input');
});

test('Invalid input type throws error', () => {
  assert.throws(() => perception.process([null]), TypeError);
});

