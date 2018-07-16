import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nickname = '';
  constructor(public navCtrl: NavController, private socket: Socket) {

  }

  joinGame() {
    this.socket.connect();
    this.socket.emit('playerJoin', { 
        playerName: this.nickname
    });
    this.navCtrl.push('GameRoomPage', { nickname: this.nickname });

  }

}
