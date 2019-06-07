import { Injectable } from '@angular/core';
import {Cell} from './cell';


@Injectable({
  providedIn: 'root'
})
export class VitalService {


  private _cells = new Map();

  constructor() { }

  private clean(): void {
    this._cells.forEach((cell: Cell, key: string) =>  {
      cell.liveOrDie();
    });
  }

  private check(): void {
    this._cells.forEach((cell: Cell, key: string) =>  {
      cell.checkNeigboursAlive();
    });
  }

  run(): void {
    this.check();
    this.clean();
  }

  reboot(gameSize: number): void {
    this.dropCellsMap();
    this.populate(gameSize);
    this.setNeighbours(gameSize);
  }

  private dropCellsMap(): void {
    this._cells = new Map();
  }

  private populate(gameSize: number): void {
    for (let i = 0; i < gameSize; i++) {
      for (let j = 0; j < gameSize; j++) {
        const cell = new Cell(i + ':' + j);
        this._cells.set(cell.id, cell);
      }
    }
  }

  private setNeighbours(gameSize: number): void {
    this._cells.forEach((cell: Cell, key: string) =>  {
      const id = cell.id;
      let row = Number(id.split(':')[0]);
      let column = Number(id.split(':')[1]);
      let neighbourRow;
      let neighbourColumn;

      for (let i =  -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          neighbourRow = row + i;
          if (neighbourRow < 0) {
            neighbourRow = gameSize - 1;
          } else if (neighbourRow > gameSize - 1) {
            neighbourRow = 0;
          }

          neighbourColumn = column + j;
          if (neighbourColumn < 0) {
            neighbourColumn = gameSize - 1;
          } else if (neighbourColumn > gameSize - 1) {
            neighbourColumn = 0;
          }

          const neighbourID = (neighbourRow) + ':' + (neighbourColumn);

          // situation i === 0 && j === 0 represents current cell, so we shouldn't push it to neighbours collection
          if (!(i === 0 && j === 0)) {
            cell.neighbours.set(neighbourID, this._cells.get(neighbourID));
          }
        }
      }
    });
  }

  get cells(): Map {
    return this._cells;
  }
}
