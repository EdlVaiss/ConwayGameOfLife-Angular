import { Component, OnInit } from '@angular/core';
import {VitalService} from '../vital.service';
import {GamePanelComponent} from '../game-panel/game-panel.component';
import {DataExchangeService} from '../data-exchange.service';

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
  private previousGameSize: number;
  private timerId: number;

  constructor(private vitalService: VitalService, private gamePanel: GamePanelComponent, private dexServise: DataExchangeService) { }

  ngOnInit() {
    this.dexServise.currentGameSize.subscribe(gameSize => this.gameSize = gameSize);
    this.previousGameSize = this.gameSize;
    this.speed = 1;
    this.getSpeedLabel();
  }


  nextGen(): void {
    this.vitalService.nextGen();
    this.gamePanel.refresh();
  }

  previousGen(): void {
    this.vitalService.previousGen();
    this.gamePanel.refresh();
  }

  start(): void {
    this.isStartBtnEnabled = false;
    this.timerId = setInterval(() => { this.nextGen(); }, 10000/Math.pow(10,this.speed));
  }

  stop(): void {
    clearTimeout(this.timerId);
    this.isStartBtnEnabled = true;
  }

  resizeGame() {
    this.previousGameSize = this.gameSize;
    this.dexServise.changeGameSize(this.gameSize);
    this.vitalService.reboot(this.gameSize);
    this.isApplyBtnDisabled = true;
    this.gamePanel.refresh();
  }

  enableApplyBtn() {
      this.isApplyBtnDisabled = false;
  }

  getSpeedLabel() {
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
        this.speedLabel = 'low';
      }
    }
  }
}
