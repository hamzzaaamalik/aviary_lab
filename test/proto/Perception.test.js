import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterSensoryByCategory filters correctly', () => {
  const inputs = [
    { type: 'audio', data: 'sound1' },
    { type: 'video', data: 'video1' },
    { type: 'audio', data: 'sound2' }
  ];
  const result = perception.filterSensoryByCategory(inputs, 'audio');
  assert.deepEqual(result, [
    { type: 'audio', data: 'sound1' },
    { type: 'audio', data: 'sound2' }
  ]);
});

test('filterSensoryByCategory throws on invalid category', () => {
  assert.throws(() => perception.filterSensoryByCategory([], ''), TypeError);
  assert.throws(() => perception.filterSensoryByCategory([], 123), TypeError);
});

test('filterSensoryByCategory throws on invalid inputs', () => {
  assert.throws(() => perception.filterSensoryByCategory([null], 'audio'), TypeError);
  assert.throws(() => perception.filterSensoryByCategory([{ type: 'audio' }], 'audio'), TypeError);
});
