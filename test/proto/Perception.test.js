import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs classifies inputs correctly', () => {
  const inputs = ['I see a tree', 'I hear a song', 'I feel the wind', 'Just some text'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    visual: ['I see a tree'],
    auditory: ['I hear a song'],
    tactile: ['I feel the wind'],
    other: ['Just some text'],
  });
});

test('categorizeSensoryInputs throws for invalid input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws for empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws for invalid item types', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});
