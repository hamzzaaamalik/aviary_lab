import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processMultiple handles null values', async () => {
  await assert.rejects(() => perception.processMultiple([null]), {
    name: 'TypeError',
    message: 'Input cannot be null or undefined'
  });
});

test('processMultiple handles empty array', async () => {
  await assert.rejects(() => perception.processMultiple([]), {
    name: 'TypeError',
    message: 'Inputs array cannot be empty'
  });
});

// Additional tests... 

