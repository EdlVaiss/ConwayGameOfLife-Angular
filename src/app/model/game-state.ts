import {Cell} from './cell';
import * as cloneDeep from 'lodash/cloneDeep';

export class GameState {

  private cells: Map<string, Cell>;

  get cells(): Map<string, Cell> {
    return this.cells;
  }

  set cells(value: Map<string, Cell>) {
    this.cells = value;
  }

  constructor() {
    this.cells = new Map<string, Cell>();
  }

  constructor(cells: Map<string, Cell>) {
    this.cells = cloneDeep(cells);
  }
}
