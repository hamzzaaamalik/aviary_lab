import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('aggregateSensoryInputs groups inputs by category', () => {
  const inputs = [
    { type: 'sound', data: 'noise' },
    { type: 'sight', data: 'image' },
    { type: 'sound', data: 'music' }
  ];
  const aggregated = perception.aggregateSensoryInputs(inputs);
  assert.equal(aggregated.get('sound').length, 2);
  assert.equal(aggregated.get('sight').length, 1);
  assert.deepEqual(aggregated.get('sound'), [
    { type: 'sound', data: 'noise' },
    { type: 'sound', data: 'music' }
  ]);
  assert.deepEqual(aggregated.get('sight'), [
    { type: 'sight', data: 'image' }
  ]);
});

test('aggregateSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.aggregateSensoryInputs('invalid'), TypeError);
  assert.throws(() => perception.aggregateSensoryInputs([{}]), TypeError);
});
