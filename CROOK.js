function Crook(descr){
	for (var property in descr) {
		this[property] = descr[property];
	}
	this.cx = this.startX;
	this.cy = this.startY;
	this.cz = this.startZ;
	this.isAlive = true;
	/*
			 _____________________
			|          |          |
			|          |          |
			| scndCube | mainCube |
			|          |          |
			|__________|__________|
			           |          |
			           |          |
			           | thrdCube |
			           |          |
			           |__________|

            Coordinate system:
            xy-plane as on picture, z axis comes out of the screen
			x <------
			        |
			        | 
			        |  
			        |   
			        |    
			        y     
	*/
}

Crook.prototype.falling = false;
Crook.prototype.isAlive = false;
Crook.prototype.addToMap = true;

Crook.prototype.pTurnX = 'A'.charCodeAt(0);
Crook.prototype.mTurnX = 'Z'.charCodeAt(0);
Crook.prototype.pTurnY = 'S'.charCodeAt(0);
Crook.prototype.mTurnY = 'X'.charCodeAt(0);
Crook.prototype.pTurnZ = 'D'.charCodeAt(0);
Crook.prototype.mTurnZ = 'C'.charCodeAt(0);
Crook.prototype.dropKey = ' '.charCodeAt(0);

Crook.prototype.mLeft  = 37; //Left arrow
Crook.prototype.mRight = 39; //Right arrow
Crook.prototype.mUp    = 38; //Up arrow
Crook.prototype.mDown  = 40; //Down arrow

Crook.prototype.turnX = 0;
Crook.prototype.turnY = 0;
Crook.prototype.turnZ = 0;

Crook.prototype.cx = 0.0;
Crook.prototype.cy = 0.0;
Crook.prototype.cz = 0.0;

Crook.prototype.startX = -3.0;
Crook.prototype.startY = -1.0;
Crook.prototype.startZ = -3.0;

Crook.prototype.scndCube = [1.0, 0.0, 0.0];
Crook.prototype.thrdCube = [0.0, 1.0, 0.0];

Crook.prototype.xRotation = 0;
Crook.prototype.yRotation = 0;
Crook.prototype.zRotation = 0;

Crook.prototype.hasRotated = false;
Crook.prototype.lastRotation = {x:0, y:0, z:0};

Crook.prototype.getMapCoords = function(){
	var mapCoords = [];
	mapCoords.push(Map.getTileCoords(this.cx, this.cy, this.cz));
	mapCoords.push(Map.getTileCoords(this.cx + this.scndCube[0], this.cy + this.scndCube[1], this.cz + this.scndCube[2]));
	mapCoords.push(Map.getTileCoords(this.cx + this.thrdCube[0], this.cy + this.thrdCube[1], this.cz + this.thrdCube[2]));
	return mapCoords;
};

Crook.prototype.kill = function(){
	if(this.addToMap){
		Map.objToMap({ 
			color: this.color, 
			coords: this.getMapCoords() 
		});
	}
	block.splice(0,1);
};

Crook.prototype.canMove = function(){
	if( Map.isSafeCube(this.cx, this.cy, this.cz) &&
		Map.isSafeCube(this.cx + this.scndCube[0], this.cy + this.scndCube[1], this.cz + this.scndCube[2]) &&
		Map.isSafeCube(this.cx + this.thrdCube[0], this.cy + this.thrdCube[1], this.cz + this.thrdCube[2])){
		return true;
	}
	return false;
};

Crook.prototype.updateRotations = function(){
	// The rotation values are 0, 90, 180 or 270.
	this.hasRotated = false;
	this.lastRotation.x = this.xRotation;
	this.lastRotation.y = this.yRotation;
	this.lastRotation.z = this.zRotation;

	if(eatKey(this.pTurnX)){
		this.hasRotated = true;
		this.xRotation += 90;
		if(this.xRotation >= 360){
			this.xRotation = 0;
		}
	}
	if(eatKey(this.pTurnY)){
		this.hasRotated = true;
		this.yRotation += 90;
		if(this.yRotation >= 360){
			this.yRotation = 0;
		}
	}
	if(eatKey(this.pTurnZ)){
		this.hasRotated = true;
		this.zRotation += 90;
		if(this.zRotation >= 360){
			this.zRotation = 0;
		}
	}

	if(eatKey(this.mTurnX)){
		this.hasRotated = true;
		this.xRotation -= 90;
		if(this.xRotation < 0){
			this.xRotation = 270;
		}
	}
	if(eatKey(this.mTurnY)){
		this.hasRotated = true;
		this.yRotation -= 90;
		if(this.yRotation < 0){
			this.yRotation = 270;
		}
	}
	if(eatKey(this.mTurnZ)){
		this.hasRotated = true;
		this.zRotation -= 90;
		if(this.zRotation < 0){
			this.zRotation = 270;
		}
	}
};

Crook.prototype.update = function(time){
	if(eatKey(this.dropKey)){
		Map.dropToFloor({
			coords: this.getMapCoords(), 
			color: this.color
		});
		this.isAlive = false;
		this.addToMap = false;
		return;
	}

	if(eatKey(this.mLeft)){
		this.cx += 1.0;
		if(!this.canMove()){
			this.cx -= 1.0;
		}
	}
	if(eatKey(this.mRight)){
		this.cx -= 1.0;
		if(!this.canMove()){
			this.cx += 1.0;
		}
	}
	if(eatKey(this.mUp)){
		this.cz += 1.0;
		if(!this.canMove()){
			this.cz -= 1.0;
		}
	}
	if(eatKey(this.mDown)){
		this.cz -= 1.0;
		if(!this.canMove()){
			this.cz += 1.0;
		}
	}

	this.updateRotations();

	if(this.falling && time === numRenders){
		this.cy -= 1.0;
		if(!this.canMove()){
			this.isAlive = false;
			this.cy += 1.0;
		}
	}
};

Crook.prototype.rotate = function(){

	this.scndCube = rotateCube(xRotArr(this.xRotation), [1, 0, 0]);
	this.scndCube = rotateCube(yRotArr(this.yRotation), this.scndCube);
	this.scndCube = rotateCube(zRotArr(this.zRotation), this.scndCube);

	this.thrdCube = rotateCube(xRotArr(this.xRotation), [0, 1, 0]);
	this.thrdCube = rotateCube(yRotArr(this.yRotation), this.thrdCube);
	this.thrdCube = rotateCube(zRotArr(this.zRotation), this.thrdCube);

	if(this.hasRotated && !this.canMove()){
		this.hasRotated = false;
		this.xRotation = this.lastRotation.x;
		this.yRotation = this.lastRotation.y;
		this.zRotation = this.lastRotation.z;
		this.rotate();
	}
};

Crook.prototype.render = function(mv){
	if(!this.isAlive){
		this.kill();
		return;
	}

	this.rotate();
	drawCube(mv, this.color, this.cx, this.cy, this.cz);
	drawCube(mv, this.color, this.cx + this.scndCube[0], this.cy + this.scndCube[1], this.cz + this.scndCube[2]);
	drawCube(mv, this.color, this.cx + this.thrdCube[0], this.cy + this.thrdCube[1], this.cz + this.thrdCube[2]);
};
