import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { SettingComponentComponent } from './setting-component/setting-component.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponentComponent,
    SettingComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
