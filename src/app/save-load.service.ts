import { Injectable } from '@angular/core';
import {Cell} from './cell';

@Injectable({
  providedIn: 'root'
})
export class SaveLoadService {

  private str: string;

  constructor() { }

  save(data: Array<Map<string, Cell>>): void {
    const buff: Array<string> = [];
    data.forEach((entry) => {buff.push(JSON.stringify(Array.from(entry.entries()))); });

    this.str = JSON.stringify(buff);
  }

  load(): Array<Map<string, Cell>> {

    const cellsArray: Array<Map<string, Cell>> = [];
    const buff: Array<string> = JSON.parse(this.str);
    buff.forEach((entry => {cellsArray.push(new Map(JSON.parse(entry))); }));

    console.log('Game loaded');
    return cellsArray;
  }
}
