import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameRoomPage } from './game-room';

@NgModule({
  declarations: [
    GameRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(GameRoomPage),
  ],
})
export class GameRoomPageModule {}
