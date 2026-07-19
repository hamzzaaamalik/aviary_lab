import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processMultiple throws error on empty input array', async () => {
  await assert.rejects(() => perception.processMultiple([]), {
    name: 'TypeError',
    message: 'Inputs array cannot be empty'
  });
});

// other existing tests here...