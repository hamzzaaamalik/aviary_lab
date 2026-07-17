import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs by type', () => {
  const inputs = [1, 'hello', true, { key: 'value' }, null];
  const expected = {
    number: [1],
    string: ['hello'],
    boolean: [true],
    object: [{ key: 'value' }, null],
  };
  assert.deepEqual(perception.categorizeSensoryInputs(inputs), expected);
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

// Add more tests for the existing methods and edge cases as needed.
