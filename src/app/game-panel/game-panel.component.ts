import { Component, OnInit, Injectable} from '@angular/core';
import {Cell} from '../model/cell';
import {DataExchangeService} from '../services/data-exchange.service';
import {VitalService} from '../services/vital.service';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class GamePanelComponent implements OnInit {


  constructor( private dexServise: DataExchangeService, private vitalService: VitalService) { }

  gameSize: number;

  ngOnInit() {
    this.dexServise.currentGameSize.subscribe(gameSize => this.gameSize = gameSize);
    this.vitalService.reboot(this.gameSize);
  }

  private numberArray(): any[] {
    return Array(this.gameSize);
  }

  toogleCell(event) {
    const cells = this.vitalService.gameState.cells;
    const tableCell = event.currentTarget;
    const cell =  cells.get(tableCell.id);
    if (tableCell.style.backgroundColor === '') {
      cell.comeToLife();
      tableCell.style.backgroundColor = cell.color;

      console.log('ID: ' + cell.id + ' Color: ' + cell.color);
      console.log('Neighbours: ' + cell.neighbours.size);
      console.log('Neighb alive: ' + cell.neighboursAlive);
    } else {

      cell.die();
      tableCell.style.backgroundColor = cell.color;

      console.log('ID: ' + cell.id + ' Color: ' + cell.color);
      console.log('Neighb alive: ' + cell.neighboursAlive);
    }
  }



  refresh(): void {
    console.log('Refresh started');
    const cells = this.vitalService.gameState.cells;
    if (cells !== undefined) {
      cells.forEach((cell: Cell, key: string) => {
        // refresh launches before new size game grid was rendered
        // so if we resize our game up at the moment refresh starts
        // there're no some td elements with proper id
        // and attempt to get style property of absent element causes error
        // so here decided just to skip this error because it doesn't influence the execution flow
        const td = document.getElementById(cell.id);
        try {
          td.style.backgroundColor = cell.color;
        } catch (e) {
        }
        if (cell.color !== '') {
          console.log('ID: ' + cell.id + ' Color: ' + cell.color);
        }
      });
    }
    console.log('Refresh finished');
  }
}
