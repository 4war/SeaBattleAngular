import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameComponent} from './game-component/game.component';
import {SettingComponent} from './setting-component/setting.component';
import {UserBattleFieldComponent} from './game-component/user-battle-field-component/user-battle-field.component';
import {AiBattleFieldComponent} from './game-component/ai-battle-field-component/ai-battle-field.component';
import {UserStateComponent} from './game-component/user-state-component/user-state.component';
import {AiStateComponent} from './game-component/ai-state-component/ai-state.component';
import {CellComponent} from './game-component/cell-component/cell.component';
import {GameService} from "./services/game.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SettingComponent,
    UserBattleFieldComponent,
    AiBattleFieldComponent,
    UserStateComponent,
    AiStateComponent,
    CellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
