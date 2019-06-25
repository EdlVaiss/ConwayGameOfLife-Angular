export class Stats {
  private _eldestCellAge: number;
  private _diedAllGame: number;
  private _bornAllGame: number;
  private _diedLastGameState: number;
  private _bornCurrentGameState: number;

  constructor() {

  }

  clone(statsObj: Stats): Stats {
    const stats = new Stats();
    stats.eldestCellAge = statsObj.eldestCellAge;
    stats.diedAllGame = statsObj.diedAllGame;
    stats.bornAllGame = statsObj.bornAllGame;
    stats.diedLastGameState = statsObj.diedLastGameState;
    stats.bornCurrentGameState = statsObj.bornCurrentGameState;
    return stats;
  }

  get eldestCellAge(): number {
    return this._eldestCellAge;
  }

  set eldestCellAge(value: number) {
    this._eldestCellAge = value;
  }

  get diedAllGame(): number {
    return this._diedAllGame;
  }

  set diedAllGame(value: number) {
    this._diedAllGame = value;
  }

  get bornAllGame(): number {
    return this._bornAllGame;
  }

  set bornAllGame(value: number) {
    this._bornAllGame = value;
  }

  get diedLastGameState(): number {
    return this._diedLastGameState;
  }

  set diedLastGameState(value: number) {
    this._diedLastGameState = value;
  }

  get bornCurrentGameState(): number {
    return this._bornCurrentGameState;
  }

  set bornCurrentGameState(value: number) {
    this._bornCurrentGameState = value;
  }
}
