import * as cloneDeep from 'lodash/cloneDeep';
import {GameState} from './game-state';

export class Game {
  private _fieldSize: number;
  private _history: Array<GameState>;

  constructor(fieldSize: number) {
    this._fieldSize = fieldSize;
    this._history = new Array<GameState>();
  }

  get history(): Array<GameState> {
    return this._history;
  }

  set history(history: Array<GameState>) {
    this._history = cloneDeep(history);
  }

  get fieldSize(): number {
    return this._fieldSize;
  }

  set fieldSize(fieldSize: number) {
    this._fieldSize = fieldSize;
  }
}
