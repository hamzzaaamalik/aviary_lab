import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory inputs correctly', () => {
  const inputs = ['img:cat', 'sound:bark', 'hello', 'img:dog', 'sound:whistle'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    text: ['hello'],
    image: ['img:cat', 'img:dog'],
    sound: ['sound:bark', 'sound:whistle']
  });
});

test('throws TypeError if inputs is not an array', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('throws TypeError if inputs is empty', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('throws TypeError if inputs contain non-string', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['img:cat', 123]), TypeError);
});
