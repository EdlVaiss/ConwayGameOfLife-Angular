import { Injectable } from '@angular/core';
import {Cell} from '../model/cell';
import * as cloneDeep from 'lodash/cloneDeep';
import {SaveLoadService} from './save-load.service';
import {GameState} from '../model/game-state';
import {Game} from '../model/game';
import {StatsService} from './stats.service';

@Injectable({
  providedIn: 'root'
})
export class VitalService {

  private _gameState: GameState;
  private game: Game;
  private _pointer: number;
  private withinHistory: boolean;

  constructor(private saveLoadService: SaveLoadService, private statsService: StatsService) {
    this._gameState = new GameState();
    this._pointer = 0;
  }

  private clean(): void {
    this._gameState.cells.forEach((cell: Cell, key: string) =>  {
      cell.liveOrDie();
    });
  }

  private check(): void {
    this.statsService.clearCurrentStateStats();
    this._gameState.cells.forEach((cell: Cell, key: string) =>  {
      cell.checkNeigboursAlive();
      this.statsService.process(cell);
    });

    console.log('Born All Game: ' + this.statsService.stats.bornAllGame);
    console.log('Born Prev State: ' + this.statsService.stats.bornCurrentGameState);
    console.log('Population Prev State: ' + this.statsService.stats.population);
    console.log('Died All Game: ' + this.statsService.stats.diedAllGame);
    console.log('Died Prev State: ' + this.statsService.stats.diedLastGameState);
    console.log('Eldest cell age: ' + this.statsService.stats.eldestCellAge);
  }

  private dropGameState(): void {
    this._gameState = new GameState();
  }

  private dropGame(fieldSize: number): void {
    this.game = new Game(fieldSize);
  }

  private pushToHistory(): void {
   this.game.history[this._pointer - 1] = cloneDeep(this._gameState);
  }

  private populate(gameSize: number): void {
    for (let i = 0; i < gameSize; i++) {
      for (let j = 0; j < gameSize; j++) {
        const cell = new Cell(i + ':' + j);
        this._gameState.cells.set(cell.id, cell);
      }
    }
  }

  private setNeighbours(gameSize: number): void {
    this._gameState.cells.forEach((cell: Cell, key: string) =>  {
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
            cell.neighbours.set(neighbourID, this._gameState.cells.get(neighbourID));
          }
        }
      }
    });
  }

  run(): void {
    this.check();
    this.pushToHistory();
    this.clean();
  }

  reboot(gameSize: number): void {
    this._pointer = 0;
    this.statsService.dropStats();
    this.dropGameState();
    this.dropGame(gameSize);
    this.populate(gameSize);
    this.setNeighbours(gameSize);
  }

  nextGen(): void {
    this._pointer++;

    if (this._pointer > this.game.history.length - 1) {
      if (this.withinHistory) {
        this.withinHistory = false;
        this.setNeighbours(this.game.fieldSize);
      }
      this.run();
      console.log('Calculated GameState #' + this._pointer);
    } else {

      this.withinHistory = true;
      this.retreiveFromHistory(this._pointer);
    }
  }

  previousGen(): void {
    this._pointer--;

    if (this._pointer < 0) {
      this._pointer = 0;
    }

    this.retreiveFromHistory(this._pointer);
  }

  goToGen(index: number): void {
    if (index <= 0) {
      this._pointer = 0;
    } else if (index > this.game.history.length - 1) {
      this._pointer = this.game.history.length - 1;
    } else {
      this._pointer = index;
    }
    this.retreiveFromHistory(this._pointer);
  }

  retreiveFromHistory(index: number): void {
    console.log('Retreiving from history GameState #' + index);
    this._gameState = this.game.history[index];
  }

  saveGame(): void {
    this.saveLoadService.save(this.game);
  }

  loadGame(file: File): Promise<any> {
    console.log('vitalServ loadGame() started');
    return new Promise(async (resolve) => {
    await this.saveLoadService.load(file);
    this.game = this.saveLoadService.loadedGame;
    this.goToGen(0);
      console.log('vitalServ loadGame() finished');
    resolve();
    });
  }

  get gameState(): GameState {
    return this._gameState;
  }

  get pointer(): number {
    return this._pointer;
  }
}
