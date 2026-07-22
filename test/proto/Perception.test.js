import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify throws on duplicate keys', () => {
  const inputs = [
    { id: 1, type: 'fruit' },
    { id: 2, type: 'fruit' }
  ];
  const classifier = (input) => input.type;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify works with unique keys', () => {
  const inputs = [
    { id: 1, type: 'fruit' },
    { id: 2, type: 'vegetable' }
  ];
  const classifier = (input) => input.type;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    fruit: [{ id: 1, type: 'fruit' }],
    vegetable: [{ id: 2, type: 'vegetable' }]
  });
});
