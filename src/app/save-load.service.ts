import { Injectable } from '@angular/core';
import {Cell} from './cell';
import {saveAs} from 'file-saver/dist/FileSaver';
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

    const blob = new Blob([this.str], {type:'application/json'})
    saveAs(blob, 'conway.json');
    console.log('Game saved successfully!');
  }

  load(): Array<Map<string, Cell>> {
    const cellsArray: Array<Map<string, Cell>> = [];
    const buff: Array<string> = JSON.parse(this.str);
    buff.forEach((entry => {cellsArray.push(new Map(JSON.parse(entry))); }));

    console.log('Game loaded');
    return cellsArray;
  }
}
