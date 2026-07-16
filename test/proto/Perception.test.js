import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound of music', 'sight of stars', 'touch of rain'];
  const categories = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categories, {
    auditory: ['sound of music'],
    visual: ['sight of stars'],
    tactile: ['touch of rain'],
    other: []
  });
});

test('categorizeSensoryInputs throws on invalid inputs', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('getCategory returns correct category', () => {
  assert.equal(perception.getCategory('sound of music'), 'auditory');
  assert.equal(perception.getCategory('sight of stars'), 'visual');
  assert.equal(perception.getCategory('touch of rain'), 'tactile');
  assert.equal(perception.getCategory('a random input'), 'other');
});

test('categorizeSensoryInputs handles mixed input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', true]), TypeError);
});

test('categorizeSensoryInputs throws on empty input array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});
