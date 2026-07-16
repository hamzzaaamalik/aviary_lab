import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs correctly categorizes inputs', () => {
  const inputs = ['image:cat.jpg', 'text:hello', 'image:dog.png', 'text:world'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    image: ['image:cat.jpg', 'image:dog.png'],
    text: ['text:hello', 'text:world'],
  });
});

test('categorizeSensoryInputs throws for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws for invalid input type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('categorizeSensoryInputs throws for non-string input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', null]), TypeError);
});

