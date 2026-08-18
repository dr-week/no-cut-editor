/**
 * @file TimelineCommander.ts
 * @description Bidirectional Command Pattern Undo/Redo Engine.
 * Manages reversible timeline commands with bounded memory history.
 * @module apps/web/src/lib/history/TimelineCommander
 */

export interface Command {
  id: string;
  description: string;
  execute: () => void;
  undo: () => void;
}

export class TimelineCommander {
  private static instance: TimelineCommander;
  private stack: Command[] = [];
  private pointer: number = -1;
  private maxHistory: number = 50;

  private constructor() {}

  public static getInstance(): TimelineCommander {
    if (!this.instance) {
      this.instance = new TimelineCommander();
    }
    return this.instance;
  }

  public execute(command: Command) {
    // Drop all redo history ahead of pointer
    this.stack = this.stack.slice(0, this.pointer + 1);
    command.execute();
    this.stack.push(command);

    // Enforce bounded memory ring buffer
    if (this.stack.length > this.maxHistory) {
      this.stack.shift();
    } else {
      this.pointer++;
    }
  }

  public undo(): boolean {
    if (this.pointer >= 0) {
      const cmd = this.stack[this.pointer];
      cmd.undo();
      this.pointer--;
      return true;
    }
    return false;
  }

  public redo(): boolean {
    if (this.pointer < this.stack.length - 1) {
      this.pointer++;
      const cmd = this.stack[this.pointer];
      cmd.execute();
      return true;
    }
    return false;
  }

  public canUndo(): boolean {
    return this.pointer >= 0;
  }

  public canRedo(): boolean {
    return this.pointer < this.stack.length - 1;
  }

  public clear() {
    this.stack = [];
    this.pointer = -1;
  }
}
