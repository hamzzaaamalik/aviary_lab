import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

// Existing tests...

// New tests for advancedFilter

test('advancedFilter filters based on multiple predicates', () => {
  const inputs = [1, 2, 3, 4, 5, 6];
  const predicates = [x => x > 2, x => x % 2 === 0];
  const result = perception.advancedFilter(inputs, predicates);
  assert.deepEqual(result, [4, 6]);
});


test('advancedFilter throws TypeError for invalid predicates', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.advancedFilter(inputs, 'not an array'), TypeError);
  assert.throws(() => perception.advancedFilter(inputs, [x => x > 1, 'not a function']), TypeError);
});

