import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  private gameSize: BehaviorSubject;
  private currentGameSize;

  constructor() {
    this.gameSize = new BehaviorSubject(20);
    this.currentGameSize = this.gameSize.asObservable();
  }

  changeGameSize(gameSize: number) {
    this.gameSize.next(gameSize);
  }
}
