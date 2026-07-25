import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('enhancedClassify classifies sensory inputs and provides additional info', () => {
  const sensoryInputs = [1, 2, 3, 4, 5, 6];
  const categories = { noise: 3, signal: 5 };
  const result = perception.enhancedClassify(sensoryInputs, categories);
  assert.deepEqual(result.classified, { noise: [3, 4, 5, 6], signal: [5, 6] });
  assert.deepEqual(result.additionalInfo, {
    noise: { count: 4, average: 4.5 },
    signal: { count: 2, average: 5.5 }
  });
});

// Other existing tests remain unchanged
