import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on duplicate keys', () => {
  const inputs = [{ id: 1 }, { id: 2 }, { id: 1 }];
  const classifier = (input) => input.id;
  assert.throws(() => perception.classify(inputs, classifier), { message: /Duplicate key found:/ });
});

test('classify returns classified inputs', () => {
  const inputs = [{ id: 1 }, { id: 2 }, { id: 1 }];
  const classifier = (input) => input.id;
  const result = perception.classify([{ id: 1 }, { id: 2 }, { id: 3 }], classifier);
  assert.deepEqual(result, { '1': [{ id: 1 }], '2': [{ id: 2 }], '3': [{ id: 3 }] });
});

