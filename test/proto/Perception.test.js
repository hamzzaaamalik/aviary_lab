import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['image:cat.jpg', 'sound:beep', 'text:hello', 'image:dog.jpg'];
  const expected = {
    image: ['image:cat.jpg', 'image:dog.jpg'],
    sound: ['sound:beep'],
    text: ['text:hello']
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([1, 2, 3]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

