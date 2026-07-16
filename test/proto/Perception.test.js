import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['http://example.com', 'Some text', 'http://another-url.com'];
  const expected = {
    url: ['http://example.com', 'http://another-url.com'],
    text: ['Some text']
  };
  assert.deepEqual(perception.categorizeSensoryInputs(inputs), expected);
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

