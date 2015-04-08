// =======
// GLOBALS
// =======
/*

Evil, ugly (but "necessary") globals, which everyone can use.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("gl-canvas");

var gl = WebGLUtils.setupWebGL( g_canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;

var state = {
	//take care of the states the game is in
	isFalling : false, //if object is falling
	hasLanded : false //if the object has landed
};

//For rotating the cubes
var radDegree = Math.PI / 180;

var xRotArr = function(angle){
	var res = [];
	res.push([1,0,0]);
	res.push([0, Math.round(Math.cos(radDegree*angle)), -Math.round(Math.sin(radDegree*angle))]);
	res.push([0, Math.round(Math.sin(radDegree*angle)), Math.round(Math.cos(radDegree*angle))]);
	return res;
};

var yRotArr = function(angle){
	var res = [];
	res.push([Math.round(Math.cos(radDegree*angle)), 0, Math.round(Math.sin(radDegree*angle))]);
	res.push([0,1,0]);
	res.push([-Math.round(Math.sin(radDegree*angle)), 0, Math.round(Math.cos(radDegree*angle))]);
	return res;
};

var zRotArr = function(angle){
	var res = [];
	res.push([Math.round(Math.cos(radDegree*angle)), -Math.round(Math.sin(radDegree*angle)), 0]);
	res.push([Math.round(Math.sin(radDegree*angle)), Math.round(Math.cos(radDegree*angle)), 0]);
	res.push([0,0,1]);
	return res;
};

var rotateCube = function(rotArr, cube){
	var res = [];
	res.push(rotArr[0][0]*cube[0] + rotArr[0][1]*cube[1] + rotArr[0][2]*cube[2]);
	res.push(rotArr[1][0]*cube[0] + rotArr[1][1]*cube[1] + rotArr[1][2]*cube[2]);
	res.push(rotArr[2][0]*cube[0] + rotArr[2][1]*cube[1] + rotArr[2][2]*cube[2]);
	return res;
};