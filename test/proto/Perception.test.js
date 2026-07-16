import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs classifies inputs correctly', async () => {
  const inputs = ['apple', 'banana', 'zebra', 'ocean'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    sight: ['apple', 'banana'],
    sound: ['zebra', 'ocean'],
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('determineInputType classifies input correctly', () => {
  assert.equal(perception.determineInputType('apple'), 'sight');
  assert.equal(perception.determineInputType('zebra'), 'sound');
});

