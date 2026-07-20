import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('process categorizes and enhances inputs', () => {
  const perception = new Perception();
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' },
    { type: 'tactile', data: 'touch1' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 3);
  assert.deepEqual(result[0], { input: inputs[0], category: 'visual', context: 'sight-related context' });
  assert.deepEqual(result[1], { input: inputs[1], category: 'auditory', context: 'sound-related context' });
  assert.deepEqual(result[2], { input: inputs[2], category: 'tactile', context: 'touch-related context' });
});

test('process throws on invalid input', () => {
  const perception = new Perception();
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.process('string'), TypeError);
  assert.throws(() => perception.process([{ type: 'invalid' }]), TypeError);
});
