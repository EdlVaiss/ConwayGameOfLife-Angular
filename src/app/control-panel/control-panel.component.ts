import { Component, OnInit } from '@angular/core';
import {VitalService} from '../services/vital.service';
import {GamePanelComponent} from '../game-panel/game-panel.component';
import {DataExchangeService} from '../services/data-exchange.service';
import {Stats} from '../model/stats';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

   gameSize: number;
   speed: number;
   speedLabel: string;
   isApplyBtnDisabled = true;
   isStartBtnEnabled = true;
   previousGameSize: number;
   timerId: number;
   currentGen: number;
   goToGenNum: number;
   stats: Stats;

  constructor(private _vitalService: VitalService, private gamePanel: GamePanelComponent, private dexServise: DataExchangeService) { }

  ngOnInit() {
    this.dexServise.currentGameSize.subscribe(gameSize => this.gameSize = gameSize);
    this.previousGameSize = this.gameSize;
    this.speed = 2;
    this.currentGen = 0;
    this.goToGenNum = 0;
    this.getSpeedLabel();
    this.stats = new Stats();
  }


  nextGen(): void {
    this._vitalService.nextGen();
    this.stats = this._vitalService.gameState.stats;
    this.gamePanel.refresh();
    this.currentGen = this._vitalService.pointer;
  }

  previousGen(): void {
    this._vitalService.previousGen();
    this.stats = this._vitalService.gameState.stats;
    this.gamePanel.refresh();
    this.currentGen = this._vitalService.pointer;
  }

  start(): void {
    this.isStartBtnEnabled = false;
    this.timerId = setInterval(() => { this.nextGen(); }, 10000 / Math.pow(10, this.speed));
  }

  stop(): void {
    clearTimeout(this.timerId);
    this.isStartBtnEnabled = true;
  }

  resizeGame(): void {
    this.stats = new Stats();
    this.previousGameSize = this.gameSize;
    this.dexServise.changeGameSize(this.gameSize);
    this._vitalService.reboot(this.gameSize);
    this.isApplyBtnDisabled = true;
    this.gamePanel.refresh();
    this.currentGen = this._vitalService.pointer;
  }

  enableApplyBtn(): void {
      this.isApplyBtnDisabled = false;
  }

  getSpeedLabel(): void {
    switch (this.speed) {
      case 1: {
        this.speedLabel = 'low';
        break;
      }
      case 2: {
        this.speedLabel = 'med';
        break;
      }
      case 3: {
        this.speedLabel = 'high';
        break;
      }
      default: {
        this.speedLabel = 'med';
      }
    }
  }

  goToGen(): void {
    this._vitalService.goToGen(this.goToGenNum);
    this.stats = this._vitalService.gameState.stats;
    this.gamePanel.refresh();
    this.currentGen = this._vitalService.pointer;
    this.goToGenNum = this.currentGen;
  }

  saveGame(): void {
    this._vitalService.saveGame();
  }

  async loadGame(file: File) {
    console.log('controlComp loadGame() started');
    if (file !== undefined) {
      await this._vitalService.loadGame(file);
      this.gamePanel.refresh();
      this.currentGen = this._vitalService.pointer;
      console.log('controlComp loadGame() finished');
    }
  }

  get vitalService(): VitalService {
    return this._vitalService;
  }
}
