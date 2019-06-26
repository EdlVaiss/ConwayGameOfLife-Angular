import {Cell} from './cell';
import * as cloneDeep from 'lodash/cloneDeep';
import {Stats} from './stats';

export class GameState {

  private _stats: Stats
  private _cells: Map<string, Cell>;

  constructor() {
    this._cells = new Map<string, Cell>();
    this._stats = new Stats();
  }

  get cells(): Map<string, Cell> {
    return this._cells;
  }

  set cells(value: Map<string, Cell>) {
    this._cells = cloneDeep(value);
  }

  get stats(): Stats {
    return this._stats;
  }

  set stats(stats: Stats) {
    this._stats = stats.clone();
  }

  toJSON() {
    return {"_stats" : this._stats, "_cells" : Array.from(this._cells.values())};
  }
}
