import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', async () => {
  const inputs = ['visual:tree', 'auditory:bird', 'visual:car', 'auditory:rain'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    visual: ['visual:tree', 'visual:car'],
    auditory: ['auditory:bird', 'auditory:rain'],
  });
});

test('categorizeSensoryInputs throws on invalid input type', async () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on empty array', async () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on non-string input', async () => {
  assert.throws(() => perception.categorizeSensoryInputs(['visual:tree', 42]), TypeError);
});

