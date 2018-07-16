var MAX_NAME_LENGTH = 22;


function Players() {
    if ( !(this instanceof Players) ) {
        return new Players();
    }
    this.init();
}


Players.prototype.init = function() {
    this.players = {};
    this.playerCount = 0; // count of total players joined, not active players
    this.activePlayerCount = 0; // count of players currently connected
    this.winningSocket = null;
}


Players.prototype.addPlayer = function(player) {
    this.playerCount++;
    this.players[player.playerId] = {
        playerId: player.playerId,
        createdTime: new Date().getTime(),
        lastActiveTime: new Date().getTime(),
        lastWinTime: 0,
        clientIp: player.clientIp || '',
        points: 0,
        origName: player.name,
        name: player.name || 'Player_' + this.playerCount
    }
    return this.players[player.playerId];
}


Players.prototype.removePlayer = function(playerId) {
    delete this.players[playerId];
}


Players.prototype.getPlayer = function(playerId) {
    return this.players[playerId];
}


Players.prototype.getPlayerName = function(playerId) {
    return this.players[playerId] ? this.players[playerId].name : '';
}


Players.prototype.getPlayerPoints = function(playerId) {
    return this.players[playerId] ? this.players[playerId].points : -1;
}


Players.prototype.addPlayerPoints = function(playerId, points) {
    if (!this.players[playerId]) {
        return -1;
    }
    this.players[playerId].points += points;
    this.players[playerId].lastWinTime = new Date().getTime();
    return this.getPlayerPoints(playerId);
}


Players.prototype.lastActive = function(playerId) {
    if (!this.players[playerId]) {
        return false;
    }
    this.players[playerId].lastActiveTime = new Date().getTime();
    return this.players[playerId];
}


Players.prototype.getPlayerCount = function() {
    return this.playerCount;
}


Players.prototype.getPlayerData = function() {
    var playerData = { 
        players: []
    };
    for (var playerId in this.players){
        playerData.players.push({
            createdTime:    this.players[playerId].createdTime,
            lastActiveTime: this.players[playerId].lastActiveTime,
            lastWinTime:    this.players[playerId].lastWinTime,
            points:         this.players[playerId].points,
            name:           this.players[playerId].name
        });
    }
    playerData.players.sort(function(a,b) {
        return b.points - a.points || a.name > b.name;
    });
    return this.playerData = playerData;
}



module.exports = Players();