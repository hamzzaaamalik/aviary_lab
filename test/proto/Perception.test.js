import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterSensoryInputsByCategories filters inputs correctly', () => {
  const inputs = [
    { type: 'sight', data: 'image1' },
    { type: 'sound', data: 'sound1' },
    { type: 'sight', data: 'image2' }
  ];
  const filtered = perception.filterSensoryInputsByCategories(inputs, ['sight']);
  assert.deepEqual(filtered, [
    { type: 'sight', data: 'image1' },
    { type: 'sight', data: 'image2' }
  ]);
});

test('filterSensoryInputsByCategories throws on invalid categories', () => {
  const inputs = [
    { type: 'sight', data: 'image1' },
  ];
  assert.throws(() => perception.filterSensoryInputsByCategories(inputs, ''), TypeError);
  assert.throws(() => perception.filterSensoryInputsByCategories(inputs, [123]), TypeError);
  assert.throws(() => perception.filterSensoryInputsByCategories(inputs, ['sight', null]), TypeError);
});
