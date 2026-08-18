import { describe, it, expect, beforeEach } from "vitest";
import { TimelineCommander, type Command } from "./TimelineCommander";

describe("TimelineCommander Ring-Buffer History", () => {
  let commander: TimelineCommander;

  beforeEach(() => {
    commander = TimelineCommander.getInstance();
    commander.clear();
  });

  it("executes and undoes sequential commands", () => {
    let state = 0;
    const cmd1: Command = {
      id: "cmd1",
      description: "Add 10",
      execute: () => { state += 10; },
      undo: () => { state -= 10; },
    };

    commander.execute(cmd1);
    expect(state).toBe(10);
    expect(commander.canUndo()).toBe(true);

    commander.undo();
    expect(state).toBe(0);
    expect(commander.canUndo()).toBe(false);
    expect(commander.canRedo()).toBe(true);

    commander.redo();
    expect(state).toBe(10);
  });

  it("truncates redo history on new branch execution", () => {
    let state = "A";
    commander.execute({
      id: "1",
      description: "to B",
      execute: () => { state = "B"; },
      undo: () => { state = "A"; },
    });
    commander.undo();
    expect(state).toBe("A");

    // Execute new action on branch
    commander.execute({
      id: "2",
      description: "to C",
      execute: () => { state = "C"; },
      undo: () => { state = "A"; },
    });

    expect(commander.canRedo()).toBe(false);
    commander.undo();
    expect(state).toBe("A");
  });
});
