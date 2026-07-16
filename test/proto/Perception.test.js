import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = ['sound:hello', 'sight:tree', 'touch:rock', 'sound:world'];
  const expected = {
    sound: ['sound:hello', 'sound:world'],
    sight: ['sight:tree'],
    touch: ['touch:rock'],
  };
  const categorized = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(categorized, expected);
});

test('categorizeSensoryInputs throws on invalid input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(['valid', 123]), TypeError);
});

