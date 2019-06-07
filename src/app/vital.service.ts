import { Injectable } from '@angular/core';
import {cells} from './game-panel/game-panel.component';
import {Cell} from './cell';


@Injectable({
  providedIn: 'root'
})
export class VitalService {

  constructor() { }

  run(): void {
    this.check();
    this.clean();
  }

  private clean(): void {
    cells.forEach((cell: Cell, key: string) =>  {
      cell.liveOrDie();
    });
  }

  private check(): void {
    cells.forEach((cell: Cell, key: string) =>  {
      cell.checkNeigboursAlive();
    });
  }
}
