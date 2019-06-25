export class Stats {
  private _eldestCellAge: number;
  private _diedAllGame: number;
  private _bornAllGame: number;
  private _diedLastGameState: number;
  private _bornCurrentGameState: number;

  constructor() {

  }

  constructor(statsObj: Stats) {
    this._eldestCellAge = statsObj.eldestCellAge;
    this._diedAllGame = statsObj.diedAllGame;
    this._bornAllGame = statsObj.bornAllGame;
    this._diedLastGameState = statsObj.diedLastGameState;
    this._bornCurrentGameState = statsObj.bornCurrentGameState;
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
