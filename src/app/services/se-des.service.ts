import { Injectable } from '@angular/core';
import {Game} from '../model/game';
import {Cell} from '../model/cell';

@Injectable({
  providedIn: 'root'
})
export class SeDesService {

  constructor() { }

  serialize(game: Game): string {
    /*const buff: Array<string> = [];
    data.forEach((entry) => {buff.push(JSON.stringify(Array.from(entry.entries()))); });

    const str = JSON.stringify(buff);*/
    const jsonStr = JSON.stringify(game);
    return jsonStr;
  }

  deserialize(str: string): Game {

   /* console.log('started parsing');
    const buff: Array<string> = JSON.parse(content);

    buff.forEach((entry) => {
      const parsedEntry: Map<string, Cell> =  new Map(JSON.parse(entry));
      console.log('parsedEntry');
      console.log(parsedEntry);
      this._cells.push(new Map(JSON.parse(entry) ));
      console.log('entry');
      console.log(entry);
    });
    console.log('saveLoadServ cells');
    console.log(this._cells);*/
const gameRAW = JSON.parse(str);
const game = new Game(gameRAW._fieldSize);
const gameStateCellsMap = new Map<string, Cell>();

   /* gameRAW._history.forEach((gameState) => {

      gameState.forEach((cellsMap) => {

      });
    });*/

console.log('gfs ' + gameRAW._history[0]._cells[0]._id);

console.log('parsed game');
console.log(gameRAW);
    return game;
  }
}
