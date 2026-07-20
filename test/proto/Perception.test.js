import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process should categorize and enhance sensory inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].category, 'visual');
  assert.equal(result[0].context, 'sight-related context');
  assert.equal(result[1].category, 'auditory');
  assert.equal(result[1].context, 'sound-related context');
});


test('process throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.process([{ type: 'invalid' }]), TypeError);
});


test('enhanceContext throws TypeError for invalid categorized data', () => {
  assert.throws(() => perception.enhanceContext(null), TypeError);
});

