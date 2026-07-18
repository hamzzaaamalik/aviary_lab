import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processBatch handles multiple sensory inputs', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    null,
    { smell: true }
  ];
  const expected = ['visual', 'auditory', 'Invalid sensory input', 'olfactory'];
  const results = perception.processBatch(inputs);
  assert.deepEqual(results, expected);
});

test('processBatch throws on non-array input', () => {
  assert.throws(() => perception.processBatch('not an array'), TypeError);
});

// Additional existing tests...
