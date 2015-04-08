function Line(descr){
	for (var property in descr) {
		this[property] = descr[property];
	}
	this.cx = this.startX;
	this.cy = this.startY;
	this.cz = this.startZ;
	this.isAlive = true;
}

Line.prototype.falling = false;
Line.prototype.isAlive = false;

Line.prototype.pTurnX = 'A'.charCodeAt(0);
Line.prototype.mTurnX = 'Z'.charCodeAt(0);
Line.prototype.pTurnY = 'S'.charCodeAt(0);
Line.prototype.mTurnY = 'X'.charCodeAt(0);
Line.prototype.pTurnZ = 'D'.charCodeAt(0);
Line.prototype.mTurnZ = 'C'.charCodeAt(0);

Line.prototype.mLeft  = 37; //Left arrow
Line.prototype.mRight = 39; //Right arrow
Line.prototype.mUp    = 38; //Up arrow
Line.prototype.mDown  = 40; //Down arrow

Line.prototype.angles = [0, 90];
Line.prototype.turnX = 0;
Line.prototype.turnY = 0;
Line.prototype.turnZ = 0;

Line.prototype.xWidth = 0.5;
Line.prototype.yWidth = 1.5;
Line.prototype.zWidth = 0.5;

Line.prototype.cx = 0.0;
Line.prototype.cy = 0.0;
Line.prototype.cz = 0.0;

Line.prototype.startX = -3.0;
Line.prototype.startY =  0.0;
Line.prototype.startZ = -2.0;

Line.prototype.turn = [ 0.0,-1.0, 0.0, 0.0, 1.0, 0.0];

Line.prototype.getMapCoords = function(){
	var mapCoords = [];
	mapCoords.push(Map.getTileCoords(this.cx, this.cy, this.cz));
	mapCoords.push(Map.getTileCoords(this.cx + this.turn[0], this.cy + this.turn[1], this.cz + this.turn[2]));
	mapCoords.push(Map.getTileCoords(this.cx + this.turn[3], this.cy + this.turn[4], this.cz + this.turn[5]));
	return mapCoords;
};

Line.prototype.kill = function(){
	Map.objToMap({ 
		color: this.color, 
		coords: this.getMapCoords() 
	});
	console.dir(this.getMapCoords());
	block.splice(0,1);
};

Line.prototype.collide = function(){
	if( this.turnX === 1 || this.turnZ === 1){
		var collideCheck = [Map.getTileCoords(this.cx , this.cy - 0.5 - this.yWidth, this.cz ),
							Map.getTileCoords(this.cx + this.turn[0], this.cy - 0.5 - this.yWidth, this.cz + this.turn[2]),
							Map.getTileCoords(this.cx + this.turn[3], this.cy - 0.5 - this.yWidth, this.cz + this.turn[5])];

		var fromMap = Map.checkMap({coords: collideCheck});
		for(var n = 0; n < fromMap.length; n++){
			if(fromMap[n] !== 0){
				this.isAlive = false;
			}
		}
	}else{
		var collideCheck = [Map.getTileCoords(this.cx + this.turn[3], this.cy - 0.5 - this.yWidth, this.cz + this.turn[5])];

		var fromMap = Map.checkMap({coords: collideCheck});
		if(fromMap[0] !== 0){
			this.isAlive = false;
		}
	}
};

Line.prototype.update = function(time){
	//TODO: set max x,y,z positions when rotated
	if(eatKey(this.mLeft)){
		this.cx += 1.0;
		if(this.cx + 0.5 + this.xWidth > 0.0){
			this.cx = 0.0 + 0.5 - this.xWidth;
		}
	}
	if(eatKey(this.mRight)){
		this.cx -= 1.0;
		if(this.cx + 0.5 - this.xWidth < -5.0){
			this.cx = -5.0 - 0.5 + this.xWidth;
		}
	}
	if(eatKey(this.mUp)){
		this.cz += 1.0;
		if(this.cz + 0.5 + this.zWidth > 0.0){
			this.cz = 0.0 + 0.5 - this.zWidth;
		}
	}
	if(eatKey(this.mDown)){
		this.cz -= 1.0;
		if(this.cz + 0.5 - this.zWidth < -5.0){
			this.cz = -5.0 - 0.5 + this.zWidth;
		}
	}

	this.rotate();
	this.collide();


	if(this.falling && time === numRenders){
		this.cy -= 1.0;
		var isDead = false;
		if(this.cy - 0.5 - this.yWidth <= -19.0){
			this.cy = -19.0 - 0.5 + this.yWidth;
			isDead = true;
		}
		if(isDead){
			this.isAlive = false;
		}
	}
};

Line.prototype.render = function(mv){
	if(!this.isAlive){
		this.kill();
		Map.fullCheck();
		return;
	}
	drawCube(mv, this.color, this.cx, this.cy, this.cz);
	drawCube(mv, this.color, this.cx + this.turn[0], this.cy + this.turn[1], this.cz + this.turn[2]);
	drawCube(mv, this.color, this.cx + this.turn[3], this.cy + this.turn[4], this.cz + this.turn[5]);
};

Line.prototype.rotate = function(){
	if(eatKey(this.pTurnX)) {
		if(this.turnZ === 1) return;
		if(this.cz === 0 || this.cz === -5) return;
		this.turnX += 1;
		if(this.turnX > 1) this.turnX = 0;}
	if(eatKey(this.mTurnX)) { 
		if(this.turnZ === 1) return;
		if(this.cz === 0 || this.cz === -5) return;
		this.turnX -= 1; 
		if(this.turnX < 0) this.turnX = 1;}
	if(eatKey(this.pTurnY)) {
		if(this.cz === 0 || this.cz === -5 ||
			this.cx === 0 || this.cx === -5) return;
		this.turnY += 1; 
		if(this.turnY > 1) this.turnY = 0;}
	if(eatKey(this.mTurnY)) { 
		if(this.cz === 0 || this.cz === -5 ||
			this.cx === 0 || this.cx === -5) return;
		this.turnY -= 1; 
		if(this.turnY < 0) this.turnY = 1;}
	if(eatKey(this.pTurnZ)) { 
		if(this.turnX === 1) return;
		if(this.cx === 0 || this.cx === -5) return;
		this.turnZ += 1; 
		if(this.turnZ > 1) this.turnZ = 0;}
	if(eatKey(this.mTurnZ)) { 
		if(this.turnX === 1) return;
		if(this.cx === 0 || this.cx === -5) return;
		this.turnZ -= 1; 
		if(this.turnZ < 0) this.turnZ = 1;}

	if( (this.angles[this.turnX] === 0 ) &&
		(this.angles[this.turnZ] === 0 ) ){
		this.turn = [ 0.0,-1.0, 0.0, 0.0, 1.0, 0.0];
		this.xWidth = 0.5;
		this.yWidth = 1.5;
		this.zWidth = 0.5; 
		 }
	else if( ((this.angles[this.turnX] === 90) &&
		(this.angles[this.turnY] === 0 )) || 
		((this.angles[this.turnZ] === 90) &&
		(this.angles[this.turnY] === 90 ))){
		this.turn = [ 0.0, 0.0,-1.0, 0.0, 0.0, 1.0];
		this.xWidth = 0.5;
		this.yWidth = 0.5;
		this.zWidth = 1.5; 
		}
	else if( (this.angles[this.turnZ] === 90) &&
		(this.angles[this.turnY] === 0 )|| 
		((this.angles[this.turnX] === 90) &&
		(this.angles[this.turnY] === 90 ))){ 
		this.turn = [-1.0, 0.0, 0.0, 1.0, 0.0, 0.0];
		this.xWidth = 1.5;
		this.yWidth = 0.5;
		this.zWidth = 0.5; 
		}
};
