import { Injectable } from '@angular/core';
import {Cell} from './cell';
import {saveAs} from 'file-saver/dist/FileSaver';
import * as cloneDeep from 'lodash/cloneDeep';

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

    const reader = new FileReader();
    const self = this;
    reader.onloadend = () => {const content = reader.result;
                              const cellsArray: Array<Map<string, Cell>> = [];
                              if (typeof  content === 'string') {
                                const buff: Array<string> = JSON.parse(content);
                                buff.forEach((entry) => {
                                  cellsArray.push(new Map(JSON.parse(entry)));
                                });
                                self._cells = cloneDeep(cellsArray);
                                console.log('Content: ' + content);
                                console.log('Game loaded');
                              }
                            };

    reader.readAsText(file);
   }
}
