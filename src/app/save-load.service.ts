import { Injectable } from '@angular/core';
import {Cell} from './cell';
import {saveAs} from 'file-saver/dist/FileSaver';
import {Promise} from 'es6-promise';

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
    this.getFileContent(file).then((content) => {
    if (typeof  content === 'string') {
      const buff: Array<string> = JSON.parse(content);
      buff.forEach((entry) => {
        this._cells.push(new Map(JSON.parse(entry)));
        console.log('end of OnFullFilled');
      });

    }
    });
   console.log('end of load()');
  }

  private getFileContent(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onerror = () => {
        reader.abort();
      };
      reader.onloadend = () => {
        resolve(reader.result);
       };
      reader.readAsText(file);
    });
  }

}
