import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on duplicate keys', () => {
  const inputs = [
    { id: 1, type: 'A' },
    { id: 2, type: 'B' },
    { id: 3, type: 'A' },
  ];
  const classifier = (input) => input.type;
  assert.throws(() => perception.classify(inputs, classifier), { message: /Duplicate key detected: A/ });
});

// Additional tests for classify

