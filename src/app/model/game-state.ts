import {Cell} from './cell';
import * as cloneDeep from 'lodash/cloneDeep';

export class GameState {

  private _cells: Map<string, Cell>;

  get cells(): Map<string, Cell> {
    return this._cells;
  }

  set cells(value: Map<string, Cell>) {
    this._cells = value;
  }

  constructor() {
    this._cells = new Map<string, Cell>();
  }

  constructor(cells: Map<string, Cell>) {
    this._cells = cloneDeep(cells);
  }
}
