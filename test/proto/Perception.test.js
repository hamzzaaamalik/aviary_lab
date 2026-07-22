import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('classify throws error on duplicate keys', () => {
  const perception = new Perception();
  const inputs = [{ id: 1 }, { id: 2 }, { id: 1 }];
  const classifier = (input) => input.id;
  assert.throws(() => perception.classify(inputs, classifier), { message: /Duplicate key found: 1/ });
});

test('classify works with unique keys', () => {
  const perception = new Perception();
  const inputs = [{ id: 1 }, { id: 2 }];
  const classifier = (input) => input.id;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, { '1': [{ id: 1 }], '2': [{ id: 2 }] });
});

// Additional tests for validateInputs and other methods can go here.