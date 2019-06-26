export class Stats {
  private _eldestCellAge: number = 0;
  private _diedAllGame: number = 0;
  private _bornAllGame: number = 0;
  private _diedLastGameState: number = 0;
  private _bornCurrentGameState: number = 0;
  private _bornLastGameState: number = 0;
  private _population: number = 0;
  private _currentPopulation: number = 0;

  constructor() {

  }

  clone(statsObj: Stats): Stats {
    const stats = new Stats();
    stats.eldestCellAge = statsObj.eldestCellAge;
    stats.diedAllGame = statsObj.diedAllGame;
    stats.bornAllGame = statsObj.bornAllGame;
    stats.diedLastGameState = statsObj.diedLastGameState;
    stats.bornCurrentGameState = statsObj.bornCurrentGameState;
    stats.bornLastGameState = statsObj.bornLastGameState;
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

  get bornLastGameState(): number {
    return this._bornLastGameState;
  }

  set bornLastGameState(value: number) {
    this._bornLastGameState = value;
  }

  get population(): number {
    return this._population;
  }

  set population(value: number) {
    this._population = value;
  }

  get currentPopulation(): number {
    return this._population - this.diedLastGameState + this.bornCurrentGameState;
  }

  set currentPopulation(value: number) {
    this._currentPopulation = value;
  }
}
