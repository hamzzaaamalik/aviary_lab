import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorize sensory inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' },
    { type: 'visual', data: 'image2' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    visual: [
      { type: 'visual', data: 'image1' },
      { type: 'visual', data: 'image2' }
    ],
    auditory: [
      { type: 'auditory', data: 'sound1' }
    ]
  });
});

test('filter sensory inputs by category', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' },
    { type: 'visual', data: 'image2' }
  ];
  const result = perception.filterSensoryInputs(inputs, 'visual');
  assert.deepEqual(result, [
    { type: 'visual', data: 'image1' },
    { type: 'visual', data: 'image2' }
  ]);
});

test('advanced filter sensory inputs by categories', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' },
    { type: 'visual', data: 'image2' },
    { type: 'gustatory', data: 'sweet' }
  ];
  const result = perception.advancedFilterSensoryInputs(inputs, ['visual', 'gustatory']);
  assert.deepEqual(result, [
    { type: 'visual', data: 'image1' },
    { type: 'visual', data: 'image2' },
    { type: 'gustatory', data: 'sweet' }
  ]);
});

