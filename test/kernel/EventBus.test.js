import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EventBus } from '../../src/kernel/EventBus.js';

test('EventBus delivers events to subscribers', () => {
  const bus = new EventBus();
  const seen = [];
  bus.on('tick', (p) => seen.push(p));
  const delivered = bus.emit('tick', { n: 1 });
  assert.equal(delivered, 1);
  assert.deepEqual(seen, [{ n: 1 }]);
});

test('unsubscribe stops delivery', () => {
  const bus = new EventBus();
  let count = 0;
  const off = bus.on('tick', () => { count++; });
  bus.emit('tick');
  off();
  bus.emit('tick');
  assert.equal(count, 1);
  assert.equal(bus.listenerCount('tick'), 0);
});

test('once fires exactly one time', () => {
  const bus = new EventBus();
  let count = 0;
  bus.once('ready', () => { count++; });
  bus.emit('ready');
  bus.emit('ready');
  assert.equal(count, 1);
});

test('a throwing handler does not block the others', () => {
  const bus = new EventBus();
  const errors = [];
  bus.onError((err) => errors.push(err.message));
  let reached = false;
  bus.on('go', () => { throw new Error('boom'); });
  bus.on('go', () => { reached = true; });
  bus.emit('go');
  assert.ok(reached);
  assert.deepEqual(errors, ['boom']);
});

test('on rejects a non-function handler', () => {
  const bus = new EventBus();
  assert.throws(() => bus.on('x', 'nope'), TypeError);
});
