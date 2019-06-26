import { Injectable } from '@angular/core';
import {Stats} from '../model/stats';
import {Cell} from '../model/cell';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

private _stats: Stats;

  constructor() {
    this._stats = new Stats();
  }

  dropStats(): void {
    this._stats = new Stats();
  }

  clearCurrentStateStats(): void {
    this._stats.diedLastGameState = 0;
    this._stats.population = 0;
    this._stats.bornCurrentGameState = 0;
    this._stats.bornLastGameState = 0;
  }

  process(cell: Cell): void {
    if (cell.isAlive) {
      if (cell.age === 0) {
        this._stats.bornAllGame++;
        this._stats.bornLastGameState++;
      }

      this._stats.population++;

      if (cell.neighboursAlive < 2 || cell.neighboursAlive > 3) {
        this._stats.diedAllGame++;
        this._stats.diedLastGameState++;
      }

      if (cell.age > this._stats.eldestCellAge) {
        this._stats.eldestCellAge = cell.age;
      }
    } else {
      if (cell.neighboursAlive === 3) {
        this._stats.bornCurrentGameState++;
      }
    }
  }

  get stats(): Stats {
    return this._stats;
  }
}
