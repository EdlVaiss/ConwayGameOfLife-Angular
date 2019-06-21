import {Cell} from './cell';
import * as cloneDeep from 'lodash/cloneDeep';

export class Game {
  private _size: number;
  private _cells: Map<string, Cell>;

  get cells(): Map<string, Cell> {
    return this._cells;
  }

  set cells(cells: Map<string, Cell>) {
    this._cells = cloneDeep(cells);
  }
  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  constructor(size: number, cells: Map<string, Cell>) {
    this._size = size;
    this._cells = cloneDeep(cells);
  }

}
