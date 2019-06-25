import { Injectable } from '@angular/core';
import {Stats} from '../model/stats';
import {Cell} from '../model/cell';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

private stats: Stats;

  constructor() {
    this.stats = new Stats();
  }

  process(cell: Cell): void {

  }
}
