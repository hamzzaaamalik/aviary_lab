import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', async () => {
  const inputs = ['sound of music', 'sight of a sunset', 'sight of a rainbow', 'sound of rain'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    auditory: ['sound of music', 'sound of rain'],
    visual: ['sight of a sunset', 'sight of a rainbow']
  });
});

test('categorizeSensoryInputs throws on invalid input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid input', 123]), TypeError);
});

test('categorizeSensoryInputs throws on empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('determineCategory classifies correctly', () => {
  assert.equal(perception.determineCategory('sound of music'), 'auditory');
  assert.equal(perception.determineCategory('sight of a sunset'), 'visual');
  assert.equal(perception.determineCategory('unknown input'), 'other');
});

