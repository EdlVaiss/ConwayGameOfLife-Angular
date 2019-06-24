import {Cell} from './cell';
import * as cloneDeep from 'lodash/cloneDeep';

export class GameState {

  private _cells: Map<string, Cell>;

  get cells(): Map<string, Cell> {
    return this._cells;
  }

  set cells(value: Map<string, Cell>) {
    this._cells = cloneDeep(value);
  }

  constructor() {
    this._cells = new Map<string, Cell>();
  }

  toJSON() {
    return {"_cells" : Array.from(this._cells.values())};
  }
}
