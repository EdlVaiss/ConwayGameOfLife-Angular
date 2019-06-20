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

  load(file: File): Promise<any> {
    console.log('saveLoadServ load() started');
   return new Promise(async (resolve) => {
    this._cells = [];
    const content = await this.getFileContent(file);
    if (typeof  content === 'string') {
      console.log('started parsing');
      const buff: Array<string> = JSON.parse(content);

      buff.forEach((entry) => {
        const parsedEntry: Map<string, Cell> =  new Map(JSON.parse(entry, (k, v) => {console.log(k + ' : ' + v); }));
        console.log('parsedEntry');
        console.log(parsedEntry);
        this._cells.push(new Map(JSON.parse(entry) ));
        console.log('entry');
        console.log(entry);
      });
      console.log('saveLoadServ cells');
      console.log(this._cells);
    }

    console.log('saveLoadServ load() finished');
    resolve();
   });
  }

  private getFileContent(file: File): Promise<string> {
    console.log('saveLoadServ getFileContent() started');
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onerror = () => {
        reader.abort();
      };
      reader.onloadend = () => {
        resolve(reader.result as string);
        console.log('file is read');
       };
      reader.readAsText(file);
      console.log('saveLoadServ getFileContent() finished');
    });
  }

}
