import { Injectable } from '@angular/core';
import {Game} from '../model/game';
import {Cell} from '../model/cell';
import {GameState} from '../model/game-state';

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
        cell.isAlive = cellObj._isAlive;
        cell.color = cellObj._color;
        cell.age = parseInt(cellObj._age);

        gameState.cells.set(cell.id, cell);
      });
      game.history.push(gameState);
    });
console.log('Game serialized successfully!')
    return game;
  }
}
