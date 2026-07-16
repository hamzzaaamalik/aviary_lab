import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['hello', 'image.jpg', 'sound.mp3', 'text'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    text: ['hello', 'text'],
    image: ['image.jpg'],
    sound: ['sound.mp3']
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([1, 2, 3]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

