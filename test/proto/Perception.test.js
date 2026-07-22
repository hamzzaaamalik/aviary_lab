import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on duplicate keys', () => {
  const inputs = [
    { id: 1, type: 'a' },
    { id: 2, type: 'b' },
    { id: 3, type: 'a' }
  ];
  const classifier = (input) => input.type;
  assert.throws(() => perception.classify(inputs, classifier), { message: 'Duplicate key found: a' });
});

// Additional tests for classify, detect, and filter methods...

