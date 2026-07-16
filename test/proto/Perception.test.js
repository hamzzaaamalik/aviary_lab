import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound:clap', 'sight:flash', 'sound:whistle', 'sight:color'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    audio: ['sound:clap', 'sound:whistle'],
    visual: ['sight:flash', 'sight:color']
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs handles unsupported types', () => {
  const inputs = ['unknown:type'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    other: ['unknown:type']
  });
});
