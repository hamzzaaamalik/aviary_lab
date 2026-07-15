import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('Perception can add and retrieve sensory data', () => {
    const perception = new Perception();
    perception.addSensoryData('sight', { brightness: 80 });
    const data = perception.getSensoryData('sight');
    assert.deepEqual(data, { brightness: 80 });
});

test('getSensoryData throws error for unknown type', () => {
    const perception = new Perception();
    assert.throws(() => perception.getSensoryData('unknown'), Error);
});

test('addSensoryData rejects non-string type', () => {
    const perception = new Perception();
    assert.throws(() => perception.addSensoryData(123, {}), TypeError);
});
