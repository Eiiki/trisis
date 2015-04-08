// =========
// MAP STUFF
// =========

"use strict";

// Map is just a single big object
var Map = {

// private variables
//The map is 6x6x20
_tiles : [
	[
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	],
	[
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	],
	[
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	],
	[
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	],
	[
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	],
	[
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	]
],
tileWidth: 1,
getTileCoords : function (x,y,z){
	x = Math.abs(x);
	y = Math.abs(y);
	z = Math.abs(z);
	var xTileCoords = Math.floor(x / this.tileWidth);
	var yTileCoords = Math.floor(y / this.tileWidth);
	var zTileCoords = Math.floor(z / this.tileWidth);

	return { x : xTileCoords, y : yTileCoords, z : zTileCoords };
},
objToMap : function(obj){
	var mapVal = obj.color;
	for(var n = 0; n < obj.coords.length; n++){
		var coord = obj.coords[n];

		this._tiles[coord.x][coord.y][coord.z] = mapVal;
	}
},
checkMap : function(obj){
	var mapReturn = [];
	for(var n = 0; n < obj.coords.length; n++){
		var coord = obj.coords[n];

		mapReturn.push(this._tiles[coord.x][coord.y][coord.z]);
	}
	return mapReturn;
},
isSafeCube : function(x, y, z){
	if(x <= -6 || y <= -20 || z <= -6 || x > 0 || z > 0){
		return false;
	}
	var tileCoords = this.getTileCoords(x,y,z);
	return this._tiles[tileCoords.x][tileCoords.y][tileCoords.z] === 0;
},
renderTile : function(x, y, z, color, mv){
	drawCube(mv, color, -x, -y, -z);
},
render : function(mv){
	var sides = 6;
	var sideCnt = 0;
	var levelCnt = 19;
	var noneOnLevel = true;
	while(levelCnt >= 0){
		sideCnt = 0;
		while(sideCnt < sides){
			var level = this._tiles[sideCnt][levelCnt];
			for(var n = 0; n < level.length; n++){
				if(level[n] !== 0){
					noneOnLevel = false;
					this.renderTile(sideCnt, levelCnt, n, level[n], mv);
				}
			}
			sideCnt++;
		}
		if(noneOnLevel){
			return;
		}
		levelCnt--;
	}
	this.fullCheck();
},
dropToFloor : function(obj){
	var isSafe = true;
	while(isSafe){
		for(var n = 0; n < obj.coords.length; n++){
			var coord = obj.coords[n];
			coord.y += 1;
			if(!this.isSafeCube(-coord.x, -coord.y, -coord.z)){
				isSafe = false;
			}
		}
	}
	for(var n = 0; n < obj.coords.length; n++){
		var coord = obj.coords[n];
		coord.y -= 1;
	}
	this.objToMap(obj);
},
fullCheck : function(){
	var emptyLevel = true;
	var fullLevel = true;
	var level = 19;
	var stop = false;
	var restack = false;
	while( level >= 0 && !stop){
		for (var xdim = 0; xdim<6; xdim++){
			for(var zdim = 0; zdim<6; zdim++){
				if(this._tiles[xdim][level][zdim] === 0){
					fullLevel = false;
				}
				if(this._tiles[xdim][level][zdim] !== 0){
					emptyLevel = false;
				}
				if(restack){
					this._tiles[xdim][level][zdim] = this._tiles[xdim][level-1][zdim];
				}
			}
		}
		if(fullLevel && !restack){
			restack = true;
			score += 100;
			console.log(score);
			fullLevel = false;
		}else if(!emptyLevel){
			level--;
		}else{stop = true;}
		fullLevel = true;
		emptyLevel = true;
	}
},
mapReset: function(){
	for(var level = 0; level < 20; level++){
		for(var i = 0; i < 6; i++){
			for(var n = 0; n < 6; n++){
				this._tiles[i][level][n] = 0;
			}
		}
	}
}
};