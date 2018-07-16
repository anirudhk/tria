webpackJsonp([0],{

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameRoomPageModule", function() { return GameRoomPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_room__ = __webpack_require__(318);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GameRoomPageModule = /** @class */ (function () {
    function GameRoomPageModule() {
    }
    GameRoomPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__game_room__["a" /* GameRoomPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__game_room__["a" /* GameRoomPage */]),
            ],
        })
    ], GameRoomPageModule);
    return GameRoomPageModule;
}());

//# sourceMappingURL=game-room.module.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/**
 * Generated class for the GameRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GameRoomPage = /** @class */ (function () {
    function GameRoomPage(navCtrl, navParams, socket, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socket = socket;
        this.toastCtrl = toastCtrl;
        this.messages = [];
        this.nickname = '';
        this.message = '';
        this.nickname = this.navParams.get('nickname');
        this.getMessages().subscribe(function (message) {
            _this.messages.push(message);
        });
        this.getUsers().subscribe(function (data) {
            var user = data['user'];
            if (data['event'] === 'left') {
                _this.showToast('User left: ' + user);
            }
            else {
                _this.showToast('User joined: ' + user);
            }
        });
    }
    GameRoomPage.prototype.sendMessage = function () {
        this.socket.emit('add-message', { text: this.message });
        this.message = '';
    };
    GameRoomPage.prototype.getMessages = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('message', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    GameRoomPage.prototype.getUsers = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('users-changed', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    GameRoomPage.prototype.ionViewWillLeave = function () {
        this.socket.disconnect();
    };
    GameRoomPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    };
    GameRoomPage.prototype.joinGame = function () {
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
        this.socket.emit('playerJoin', {
            playerName: this.nickname
        });
    };
    GameRoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-game-room',template:/*ion-inline-start:"/Users/anirudh/Documents/Flixy/trivia/client/trivia/src/pages/game-room/game-room.html"*/'<ion-content style="background-color: #263238">\n  <ion-card style=" height: 70%;\n                    margin-top: 15%;\n                    border-radius: 40px;\n                    background-color: #607D8B;\n                    text-align: center;\n                    color: white;\n                    ">\n    <div style="margin-top: 25%;\n                font-size: 25px;">\n      {{question}}\n    </div>\n    <div radio-group [(ngModel)]="answer">\n      <div *ngFor="let choice of choices">\n        <button ion-button round large (click)="submitAnswer(choice);enabled=true;" style="width: 80%" [ngClass]="{\'bgColor\':enabled}">\n          {{choice}}\n        </button>\n      </div>\n    </div>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/anirudh/Documents/Flixy/trivia/client/trivia/src/pages/game-room/game-room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
    ], GameRoomPage);
    return GameRoomPage;
}());

//# sourceMappingURL=game-room.js.map

/***/ })

});
//# sourceMappingURL=0.js.map