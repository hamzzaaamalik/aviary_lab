import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processAndFilter aggregates filtered sensory inputs by category', () => {
  const inputs = [
    { type: 'sound', data: 'chirp' },
    { type: 'sight', data: 'bird' },
    { type: 'sound', data: 'buzz' },
  ];
  const result = perception.processAndFilter(inputs, 'sound');
  assert.deepEqual(result.get('sound'), [
    { type: 'sound', data: 'chirp' },
    { type: 'sound', data: 'buzz' }
  ]);
  assert.equal(result.size, 1);
});

test('processAndFilter throws for invalid category', () => {
  assert.throws(() => perception.processAndFilter([], ''), TypeError);
});

test('processAndFilter handles invalid sensory inputs', () => {
  assert.throws(() => perception.processAndFilter([{ type: 'sound' }], 'sound'), TypeError);
});

