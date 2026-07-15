import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ModuleRegistry } from '../../src/kernel/ModuleRegistry.js';

test('boots modules in dependency order', () => {
  const order = [];
  const registry = new ModuleRegistry({});
  registry.register({ name: 'b', deps: ['a'], init: () => order.push('b') });
  registry.register({ name: 'a', init: () => order.push('a') });
  const booted = registry.boot();
  assert.deepEqual(order, ['a', 'b']);
  assert.deepEqual(booted, ['a', 'b']);
});

test('detects a dependency cycle instead of hanging', () => {
  const registry = new ModuleRegistry({});
  registry.register({ name: 'a', deps: ['b'] });
  registry.register({ name: 'b', deps: ['a'] });
  assert.throws(() => registry.boot(), /cycle/);
});

test('rejects an unknown dependency', () => {
  const registry = new ModuleRegistry({});
  registry.register({ name: 'a', deps: ['ghost'] });
  assert.throws(() => registry.boot(), /unknown dependency/);
});

test('refuses a duplicate registration', () => {
  const registry = new ModuleRegistry({});
  registry.register({ name: 'a' });
  assert.throws(() => registry.register({ name: 'a' }), /already registered/);
});

test('a module needs a string name', () => {
  const registry = new ModuleRegistry({});
  assert.throws(() => registry.register({}), TypeError);
});
