import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputsByUrgency categorizes inputs correctly', () => {
  const inputs = [
    { input: 'fire', urgency: 5 },
    { input: 'water', urgency: 3 },
    { input: 'breeze', urgency: 1 },
    { input: 'earthquake', urgency: 4 }
  ];

  const expected = {
    high: [
      { input: 'fire', urgency: 5 },
      { input: 'earthquake', urgency: 4 }
    ],
    medium: [
      { input: 'water', urgency: 3 }
    ],
    low: [
      { input: 'breeze', urgency: 1 }
    ]
  };

  const result = perception.categorizeSensoryInputsByUrgency(inputs);
  assert.deepEqual(result, expected);
});

// Additional tests as needed
