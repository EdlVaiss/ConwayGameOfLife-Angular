import {Cell} from './cell';
import * as cloneDeep from 'lodash/cloneDeep';
import {GameState} from './game-state';

export class Game {
  private fieldSize: number;
  private game: Set<GameState>;

  get game(): Set<GameState> {
    return this.game;
  }

  set game(game: Set<GameState>) {
    this.game = cloneDeep(game);
  }
  get size(): number {
    return this.fieldSize;
  }

  set size(value: number) {
    this.fieldSize = value;
  }

  constructor(fieldSize: number) {
    this.fieldSize = fieldSize;
    this.game = new Set<GameState>();
  }

  constructor(fieldSize: number, game: Set<GameState>) {
    this.fieldSize = fieldSize;
    this.game = cloneDeep(game);
  }

}
