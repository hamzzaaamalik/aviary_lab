import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GoalModel } from '../../src/proto/reasoning/GoalModel.js';

test('GoalModel initializes with description', () => {
    const goal = new GoalModel('Learn reasoning');
    assert.equal(goal.getDescription(), 'Learn reasoning');
    assert.equal(goal.isCompleted(), false);
});

test('GoalModel can be marked as complete', () => {
    const goal = new GoalModel('Build a planner');
    goal.complete();
    assert.equal(goal.isCompleted(), true);
});
