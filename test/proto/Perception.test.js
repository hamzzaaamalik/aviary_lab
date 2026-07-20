import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterSensoryInputsByCategories filters correctly', () => {
  const inputs = [
    { type: 'audio', data: 'sound' },
    { type: 'visual', data: 'image' },
    { type: 'audio', data: 'music' }
  ];
  const filtered = perception.filterSensoryInputsByCategories(inputs, ['audio']);
  assert.deepEqual(filtered, [
    { type: 'audio', data: 'sound' },
    { type: 'audio', data: 'music' }
  ]);
});

test('filterSensoryInputsByCategories throws on invalid input', () => {
  assert.throws(() => perception.filterSensoryInputsByCategories('not an array', ['audio']), TypeError);
  assert.throws(() => perception.filterSensoryInputsByCategories([], ''), TypeError);
});

test('filterSensoryInputsByCategories throws on empty categories', () => {
  assert.throws(() => perception.filterSensoryInputsByCategories([], []), TypeError);
});

