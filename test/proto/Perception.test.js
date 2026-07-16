import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs groups inputs correctly', () => {
  const inputs = ['image:cat', 'text:hello', 'image:dog', 'text:world'];
  const expected = {
    image: ['image:cat', 'image:dog'],
    text: ['text:hello', 'text:world']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on empty input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});
