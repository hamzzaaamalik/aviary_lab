import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs categorizes inputs correctly', async () => {
  const perception = new Perception();
  const inputs = ['text:hello', 'image:cat', 'text:world', 'audio:music'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    text: ['text:hello', 'text:world'],
    image: ['image:cat'],
    audio: ['audio:music'],
  });
});

test('categorizeSensoryInputs throws on invalid input type', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs(['text:hello', 42]), TypeError);
});

test('categorizeSensoryInputs throws on empty input array', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws on null or undefined input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs(['text:hello', null]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['text:hello', undefined]), TypeError);
});

// Additional tests for perceive and perceiveMultiple can be added here.