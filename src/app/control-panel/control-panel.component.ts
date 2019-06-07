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

  constructor(private vitalService: VitalService, private gamePanel: GamePanelComponent, private dexServise: DataExchangeService) { }

  ngOnInit() {
    this.dexServise.currentGameSize.subscribe(gameSize => this.gameSize = gameSize);
  }

  nextGen(): void {
    this.vitalService.run();
    this.gamePanel.refresh();
  }

}
