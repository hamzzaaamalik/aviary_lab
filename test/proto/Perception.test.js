import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory inputs by type', () => {
  const inputs = ['https://example.com', 'user@example.com', '42', 'hello'];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    url: ['https://example.com'],
    email: ['user@example.com'],
    number: ['42'],
    text: ['hello']
  });
});

test('categorize sensory inputs throws if not an array', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorize sensory inputs throws if empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorize sensory inputs throws if contains non-string', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

