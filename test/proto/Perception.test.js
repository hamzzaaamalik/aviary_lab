import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs classifies inputs correctly', () => {
  const perception = new Perception();
  const inputs = ['http://example.com', 'hello', 'https://aviary.dev', 'world'];
  const expected = {
    url: ['http://example.com', 'https://aviary.dev'],
    text: ['hello', 'world'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

test('categorizeSensoryInputs throws on empty input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});
