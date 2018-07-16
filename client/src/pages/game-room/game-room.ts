/**
 * Generated class for the GameRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

 
@IonicPage()
@Component({
  selector: 'page-game-room',
  templateUrl: 'game-room.html',
})
export class GameRoomPage {
  messages = [];
  nickname = '';
  message = '';
  question = '';
  correctAnswer = '';
  showAnswer = false;
  enabled = false;
  choices = [];
  buttonColor: string = "black";
 
  constructor(private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    this.nickname = this.navParams.get('nickname');
    console.log("constructor calling");
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });
 
    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

    this.getQuestions().subscribe(data => {
      this.processServerResponse(data);
      //this.messages.push(message);
    });
    
  }

  init(){
    this.buttonColor = "black";
  }
  
  processServerResponse(data){
    this.init();
    this.question = data.question;
    if(data.choices){
      console.log("choices are present");
      this.choices = data.choices;
    }
    

    if(data.correctAnswer){
     // this.showAnswer = true;
      this.correctAnswer = data.correctAnswer;
    }
    console.log(data);
  }
  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getQuestions(){
    let observable = new Observable(observer => {
      this.socket.on('question', (data) =>{
        console.log("received server data");
        observer.next(data);
      });
    });
    return observable;
  }
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  joinGame(){
    console.log('joinBtnClick:', this);
            this.socket.on('players', function (data) {
                console.log('players updated, data:', data);
              //  $('.playerMsg').html(data.msg);
              //  that.renderPlayers(data.players);
            });

            this.socket.on('question', function (data) {
                console.log('received question, data: ', data);
              //  that.renderQuestionAnswers(data);
            });

            // this.socket.emit('playerJoin', { 
            //     playerName: this.nickname
            // });
  }  

  submitAnswer(choice, index){
    console.log("inside submit ");
    console.log(index);
    console.log(choice);
   // this.buttonColor = '#345465'; 
      this.socket.emit('answer', { 
      answer: choice,
      question: 'Question'
      //question: this.model.get('question')
  });
  }
}