import { Injectable } from '@angular/core';
import {Game} from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class SeDesService {

  constructor() { }

  serialize(game: Game): string {
    return '';
  }

  deserialize(str: string): Game {
    return new Game(20);
  }
}
