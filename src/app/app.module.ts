import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamePanelComponent } from './game-panel/game-panel.component';
import {FormsModule} from '@angular/forms';
import { ControlPanelComponent } from './control-panel/control-panel.component';

import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {SpinnerModule} from 'primeng/spinner';

@NgModule({
  declarations: [
    AppComponent,
    GamePanelComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ButtonModule,
    SliderModule,
    SpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
