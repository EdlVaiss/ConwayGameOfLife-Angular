import { Component, OnInit, Injectable} from '@angular/core';
import {Cell} from '../cell';
import {DataExchangeService} from '../data-exchange.service';

export const cells = new Map();

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class GamePanelComponent implements OnInit {
  gameSize: number;

  constructor( private dexServise: DataExchangeService) { }

  ngOnInit() {
    this.dexServise.currentGameSize.subscribe(gameSize => this.gameSize = gameSize);
    this.populate();
    this.setNeighbours();
  }

  private numberArray(): any[] {
    return Array(this.gameSize);
  }

  toogleCell(event) {
    const tableCell = event.currentTarget;
    const cell =  cells.get(tableCell.id);
    if (tableCell.style.backgroundColor === '') {
      cell.comeToLife();
      cell.grow();
      tableCell.style.backgroundColor = cell.color;

      console.log('ID: ' + cell.id + ' Color: ' + cell.color);
      console.log('Neighbours: ' + cell.neighbours.size);
      console.log("Neighb alive: " + cell.neighboursAlive);
    } else {

      cell.die();
      tableCell.style.backgroundColor = cell.color;

      console.log('ID: ' + cell.id + ' Color: ' + cell.color);
      console.log("Neighb alive: " + cell.neighboursAlive);
    }
  }

  populate(): void {
    for (let i = 0; i < this.gameSize; i++) {
      for (let j = 0; j < this.gameSize; j++) {
        const cell = new Cell(i + ':' + j);
        cells.set(cell.id, cell);
      }
    }
  }

  setNeighbours(): void {
    cells.forEach((cell: Cell, key: string) =>  {
      const id = cell.id;
      let row = Number(id.split(':')[0]);
      let column = Number(id.split(':')[1]);
      let neighbourRow;
      let neighbourColumn;

      for (let i =  -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          neighbourRow = row + i;
          if (neighbourRow < 0) {
            neighbourRow = this.gameSize - 1;
          } else if (neighbourRow > this.gameSize - 1) {
            neighbourRow = 0;
          }

          neighbourColumn = column + j;
          if (neighbourColumn < 0) {
            neighbourColumn = this.gameSize - 1;
          } else if (neighbourColumn > this.gameSize - 1) {
            neighbourColumn = 0;
          }

          const neighbourID = (neighbourRow) + ':' + (neighbourColumn);

          // situation i === 0 && j === 0 represents current cell, so we shouldn't push it to neighbours collection
          if (!(i === 0 && j === 0)) {
            cell.neighbours.set(neighbourID, cells.get(neighbourID));
          }
        }
      }
    });

  }

  refresh(): void {
    console.log('Refresh started');
    cells.forEach((cell: Cell, key: string) => {
      const td = document.getElementById(cell.id);
      td.style.backgroundColor = cell.color;
      if (cell.color !== '') {
        console.log('ID: ' + cell.id + ' Color: ' + cell.color);
     }
    });
    console.log('Refresh finished');
  }
}
