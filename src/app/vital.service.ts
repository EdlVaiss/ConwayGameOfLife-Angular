import { Injectable } from '@angular/core';
import {Cell} from './cell';
import * as cloneDeep from 'lodash/cloneDeep';

@Injectable({
  providedIn: 'root'
})
export class VitalService {


  private _cells: Map<string, Cell>;
  private history: Array<Map<string, Cell>>;
  private pointer: number;

  constructor() {
    this._cells = new Map<string, Cell>();
    this.history = [];
    this.pointer = 0;
  }

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

  private dropCellsMap(): void {
    this._cells = new Map();
  }

  private dropHistory(): void {
    this.history = [];
  }

  private pushToHistory(): void {
   this.history[this.pointer - 1] = cloneDeep(this._cells);
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
      const row = Number(id.split(':')[0]);
      const column = Number(id.split(':')[1]);
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

  run(): void {
    this.pushToHistory();
    this.check();
    this.clean();
  }

  reboot(gameSize: number): void {
    this.dropCellsMap();
    this.dropHistory();
    this.populate(gameSize);
    this.setNeighbours(gameSize);
  }

  nextGen(): void {
    this.pointer++;

    if (this.pointer > this.history.length - 1) {
      this.run();
    } else {
      this.retreiveFromHistory(this.pointer);
    }
    //TODO del console log
    console.log("NextGen called. Pointer: " + this.pointer);
  }

  previousGen(): void {
    this.pointer--;

    if (this.pointer < 0) {
      this.pointer = 0;
    }
    this.retreiveFromHistory(this.pointer);
    //TODO del console log
    console.log("PrevGen called. Pointer: " + this.pointer);
  }

  retreiveFromHistory(index: number): void {
    this._cells = this.history[index];
  }

  get cells(): Map<string, Cell> {
    return this._cells;
  }
}
