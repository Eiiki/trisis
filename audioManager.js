/*

audioManager.js

can set songs with ID and then play them by those ID's

*/


"use strict";

var audioManager = {

_audio : {},
_disabled : {},

set : function(path, ID) {
    this._audio[ID] = new Audio(path);
},

play : function(path, vol, loop) {
    if (vol === undefined) vol = 1;
    if (loop === undefined) loop = false;
    var audio = new Audio(path);
    audio.volume = vol;
    audio.loop = loop;
    if(!g_mute) audio.play();
},

playByID : function(ID, vol, loop) {
    if (vol === undefined) vol = 1;
    if (loop === undefined) loop = false;

    if (!(ID in this._disabled)) {
        this._audio[ID].volume = vol;
        this._audio[ID].loop = loop;
        this._audio[ID].play();
    }
},

disableByID : function(ID) {
    this._disabled[ID] = ID;
},

pause : function(ID) {
    this._audio[ID].pause();
},

muteAll : function(){
    for(var n in this._audio){
        this._audio[n].muted = true;
    }
},

unmuteAll : function(){
    for(var n in this._audio){
        this._audio[n].muted = false;
    }
}

};