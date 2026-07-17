import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory inputs by type', () => {
  const inputs = ['hello', 42, true, null, { key: 'value' }];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    string: ['hello'],
    number: [42],
    boolean: [true],
    object: [null, { key: 'value' }]
  });
});

test('categorize sensory inputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorize sensory inputs handles empty array', () => {
  const inputs = [];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {});
});

// Existing tests...
