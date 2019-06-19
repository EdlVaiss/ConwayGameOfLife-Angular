import { Injectable } from '@angular/core';
import {Cell} from './cell';
import {saveAs} from 'file-saver/dist/FileSaver';

@Injectable({
  providedIn: 'root'
})
export class SaveLoadService {
  get cells(): Array<Map<string, Cell>> {
    return this._cells;
  }

  private _cells: Array<Map<string, Cell>> = [];

  constructor() { }

  save(data: Array<Map<string, Cell>>): void {
    const buff: Array<string> = [];
    data.forEach((entry) => {buff.push(JSON.stringify(Array.from(entry.entries()))); });

    const str = JSON.stringify(buff);

    const blob = new Blob([str], {type: 'application/json'});
    saveAs(blob, 'conway.json');
    console.log('Game saved successfully!');
  }

  load(file: File): void {
    this._cells = [];
    const reader = new FileReader();

    reader.onloadend = () => {
      const content = reader.result;

      if (typeof  content === 'string') {
        const buff: Array<string> = JSON.parse(content);
        buff.forEach((entry) => {
          this._cells.push(new Map(JSON.parse(entry)));
        });

        console.log(this._cells);
        console.log('Game loaded');
      }
    };

    reader.readAsText(file);

   }
}
