import { Injectable } from '@angular/core';
import {Game} from '../model/game';
import {Cell} from '../model/cell';
import {GameState} from '../model/game-state';
import {Stats} from '../model/stats';

@Injectable({
  providedIn: 'root'
})
export class SeDesService {

  constructor() { }

  serialize(game: Game): string {
    const jsonStr = JSON.stringify(game);
    return jsonStr;
  }

  deserialize(str: string): Game {

    const gameRAW = JSON.parse(str);

    const game = new Game(gameRAW._fieldSize);
    const gameStateCellsMap = new Map<string, Cell>();

    gameRAW._history.forEach((gameStateObj) => {
      const gameState = new GameState();
      gameStateObj._cells.forEach((cellObj) => {
        const cell = new Cell(cellObj._id);
        cell.isAlive = cellObj._isAlive !== undefined ? cellObj._isAlive : false;
        cell.color = cellObj._color !== undefined ? cellObj._color : '';
        cell.age = cellObj._age !== undefined ? parseInt(cellObj._age) : 0;
        cell.neighboursAlive = cellObj._neighboursAlive !== undefined ? parseInt(cellObj._neighboursAlive) : 0;

        gameState.cells.set(cell.id, cell);
      });

      const stats =  gameStateObj._stats;
      gameState.stats.eldestCellAge = stats._eldestCellAge;
      gameState.stats.diedLastGameState = stats._diedLastGameState;
      gameState.stats.diedAllGame = stats._diedAllGame;
      gameState.stats.currentPopulation = stats._currentPopulation;
      gameState.stats.population = stats._population;
      gameState.stats.bornLastGameState = stats._bornLastGameState;
      gameState.stats.bornCurrentGameState = stats._bornCurrentGameState;
      gameState.stats.bornAllGame = stats._bornAllGame;

      game.history.push(gameState);
    });

    console.log('Game serialized successfully!')
    return game;
  }
}
