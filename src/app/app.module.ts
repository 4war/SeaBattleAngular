import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game-component/game.component';
import { SettingComponentComponent } from './setting-component/setting-component.component';
import { UserBattleFieldComponent } from './game-component/user-battle-field-component/user-battle-field.component';
import { AiBattleFieldComponent } from './game-component/ai-battle-field-component/ai-battle-field.component';
import { UserStateComponentComponent } from './game-component/user-state-component/user-state-component.component';
import { AiStateComponentComponent } from './game-component/ai-state-component/ai-state-component.component';
import { CellComponent } from './game-component/cell-component/cell.component';
import {BattleField} from "./Models/BattleField";
import {Game} from "./Models/Game";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SettingComponentComponent,
    UserBattleFieldComponent,
    AiBattleFieldComponent,
    UserStateComponentComponent,
    AiStateComponentComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Game, BattleField],
  bootstrap: [AppComponent]
})
export class AppModule { }
