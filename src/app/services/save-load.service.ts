import { Injectable } from '@angular/core';
import {Cell} from '../model/cell';
import {saveAs} from 'file-saver/dist/FileSaver';
import {SeDesService} from './se-des.service';
import {Game} from '../model/game';


@Injectable({
  providedIn: 'root'
})
export class SaveLoadService {
  get loadedGame(): Game {
    return this._loadedGame;
  }

  private _loadedGame: Game;

  constructor(private seDes: SeDesService) { }

  save(game: Game): void {

    const str = this.seDes.serialize(game);

    const blob = new Blob([str], {type: 'application/json'});
    saveAs(blob, 'conway.json');
    console.log('Game saved successfully!');
  }

  load(file: File): Promise<any> {
    console.log('saveLoadServ load() started');
    return new Promise(async (resolve) => {

    const content = await this.getFileContent(file);
    if (typeof  content === 'string') {
      this._loadedGame = this.seDes.deserialize(content);
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
