import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { SettingComponentComponent } from './setting-component/setting-component.component';
import { UserBattleFieldComponentComponent } from './game-component/user-battle-field-component/user-battle-field-component.component';
import { AiBattleFieldComponentComponent } from './game-component/ai-battle-field-component/ai-battle-field-component.component';
import { UserStateComponentComponent } from './game-component/user-state-component/user-state-component.component';
import { AiStateComponentComponent } from './game-component/ai-state-component/ai-state-component.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponentComponent,
    SettingComponentComponent,
    UserBattleFieldComponentComponent,
    AiBattleFieldComponentComponent,
    UserStateComponentComponent,
    AiStateComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
