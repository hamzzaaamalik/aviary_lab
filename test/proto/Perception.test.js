import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound:clap', 'sight:tree', 'touch:grass', 'sound:whistle'];
  const expected = {
    sound: ['sound:clap', 'sound:whistle'],
    sight: ['sight:tree'],
    touch: ['touch:grass'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws on invalid input types', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['sound:clap', 123]), TypeError);
});

test('categorizeSensoryInputs throws on empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

