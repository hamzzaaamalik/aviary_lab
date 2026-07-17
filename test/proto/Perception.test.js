import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory inputs', () => {
  const inputs = [42, 'hello', true, null, 'world', 3.14];
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, {
    number: [42, 3.14],
    string: ['hello', 'world'],
    boolean: [true],
    object: [null],
  });
});

test('categorize sensory inputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(123), TypeError);
});
