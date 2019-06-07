import { Component, OnInit, Injectable} from '@angular/core';
import {Cell} from '../cell';
import {DataExchangeService} from '../data-exchange.service';
import {VitalService} from '../vital.service';

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


  constructor( private dexServise: DataExchangeService, private vitalService: VitalService) { }

  ngOnInit() {
    this.dexServise.currentGameSize.subscribe(gameSize => this.gameSize = gameSize);
    this.vitalService.reboot(this.gameSize);
  }

  private numberArray(): any[] {
    return Array(this.gameSize);
  }

  toogleCell(event) {
    const cells = this.vitalService.cells;
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



  refresh(): void {
    console.log('Refresh started');
    const cells = this.vitalService.cells;
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
