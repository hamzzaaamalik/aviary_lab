import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound:beep', 'image:photo1', 'sound:click', 'image:photo2'];
  const expected = {
    audio: ['sound:beep', 'sound:click'],
    visual: ['image:photo1', 'image:photo2'],
  };
  const categories = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categories, expected);
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('detectInputType identifies audio correctly', () => {
  assert.equal(perception.detectInputType('sound:beep'), 'audio');
});

test('detectInputType identifies visual correctly', () => {
  assert.equal(perception.detectInputType('image:photo1'), 'visual');
});

test('detectInputType identifies other input types', () => {
  assert.equal(perception.detectInputType('text:message'), 'other');
});

