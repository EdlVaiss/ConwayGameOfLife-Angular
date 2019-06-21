import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  private gameSize: BehaviorSubject<number>;
  private _currentGameSize;

  constructor() {
    this.gameSize = new BehaviorSubject(20);
    this._currentGameSize = this.gameSize.asObservable();
  }

  changeGameSize(gameSize: number) {
    this.gameSize.next(gameSize);
  }

  get currentGameSize() {
    return this._currentGameSize;
  }
}
