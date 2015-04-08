/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Jörðin (sem teningur!) snýst um sólina (stærri teningur!)
//
//    Hjálmtýr Hafsteinsson, febrúar 2015
/////////////////////////////////////////////////////////////////
var gl;

var numVertices  = 36;

var score = 0;

var points = {};
var texCoords = {};

var gameMode = false;
var mute = false;

var tBuffer ;
var vBuffer ;
var iBuffer ;
var vPosition ;
var vTexCoord ;

var u_imageLocation;

var textures = [];

var zDist = -25.0;
var timer = 0;
var numRenders = 15;

var cubeImage = [];
var cubeTexture = [];

var block = [];
var col = [];
var vertices = [];

var proLoc;
var mvLoc;

var g_images = {};

function requestPreloads() {

    var requiredImages = [
    "bw.png",
    "blue.png",
    "red.png",
    "green.png",
    "yellow.png",
    "purple.png"
    ];

    for(var i = 0; i< requiredImages.length; i++){
        initTextures(requiredImages[i], i);
    }
    init();
}

var indices = [11, 8, 12, 11, 12, 15,
               9, 8, 11, 9, 11, 10,
              13, 12, 8, 13, 8, 9,
              14, 15, 12, 14, 12, 13,
              10, 11, 15, 10, 15, 14,
              13, 9, 10, 13, 10, 14];

var texCoords = [
    // Front
    vec2(0.0, 0.0),
    vec2(1.0, 0.0),
    vec2(1.0, 1.0),
    vec2(0.0, 1.0),
    // Back
    vec2(0.0, 0.0),
    vec2(1.0, 0.0),
    vec2(1.0, 1.0),
    vec2(0.0, 1.0),
    // Top
    vec2(0.0, 0.0),
    vec2(1.0, 0.0),
    vec2(1.0, 1.0),
    vec2(0.0, 1.0),
    // Bottom
    vec2(0.0, 0.0),
    vec2(1.0, 0.0),
    vec2(1.0, 1.0),
    vec2(0.0, 1.0),
    // Right
    vec2(0.0, 0.0),
    vec2(1.0, 0.0),
    vec2(1.0, 1.0),
    vec2(0.0, 1.0),
    // Left
    vec2(0.0, 0.0),
    vec2(1.0, 0.0),
    vec2(1.0, 1.0),
    vec2(0.0, 1.0),
                            //change
    // Front
    vec2(0.0, 0.0),
    vec2(6.0, 0.0),
    vec2(6.0, 20.0),
    vec2(0.0, 20.0),
    // Back
    vec2( 0.0, 0.0),
    vec2(20.0, 0.0),
    vec2(20.0, 6.0),
    vec2( 0.0, 6.0),
    // Top
    vec2(0.0, 0.0),
    vec2(6.0, 0.0),
    vec2(6.0, 6.0),
    vec2(0.0, 6.0),
    // Bottom
    vec2(0.0, 0.0),
    vec2(6.0, 0.0),
    vec2(6.0, 6.0),
    vec2(0.0, 6.0),
    // Right
    vec2( 0.0, 0.0),
    vec2(20.0, 0.0),
    vec2(20.0, 6.0),
    vec2( 0.0, 6.0),
    // Left
    vec2( 0.0, 0.0),
    vec2(6.0, 0.0),
    vec2(6.0, 20.0),
    vec2(0.0, 20.0)
  ];

vertices = [
        // Front face
        vec3(-0.5, -0.5,  0.5),
        vec3( 0.5, -0.5,  0.5),
        vec3( 0.5,  0.5,  0.5),
        vec3(-0.5,  0.5,  0.5),
        
        // Back face
        vec3(-0.5, -0.5, -0.5),
        vec3(-0.5,  0.5, -0.5),
        vec3( 0.5,  0.5, -0.5),
        vec3( 0.5, -0.5, -0.5),
        
        // Top face
        vec3(-0.5,  0.5, -0.5),
        vec3(-0.5,  0.5,  0.5),
        vec3( 0.5,  0.5,  0.5),
        vec3( 0.5,  0.5, -0.5),
        
        // Bottom face
        vec3(-0.5, -0.5, -0.5),
        vec3( 0.5, -0.5, -0.5),
        vec3( 0.5, -0.5,  0.5),
        vec3(-0.5, -0.5,  0.5),
        
        // Right face
        vec3( 0.5, -0.5, -0.5),
        vec3( 0.5,  0.5, -0.5),
        vec3( 0.5,  0.5,  0.5),
        vec3( 0.5, -0.5,  0.5),
        
        // Left face
        vec3(-0.5, -0.5, -0.5),
        vec3(-0.5, -0.5,  0.5),
        vec3(-0.5,  0.5,  0.5),
        vec3(-0.5,  0.5, -0.5),
                                //change
        // Front face
        vec3(-3.0, -10.0,  3.0),
        vec3( 3.0, -10.0,  3.0),
        vec3( 3.0,  10.0,  3.0),
        vec3(-3.0,  10.0,  3.0),
        
        // Back face
        vec3(-3.0, -10.0, -3.0),
        vec3(-3.0,  10.0, -3.0),
        vec3( 3.0,  10.0, -3.0),
        vec3( 3.0, -10.0, -3.0),
        
        // Top face
        vec3(-3.0,  10.0, -3.0),
        vec3(-3.0,  10.0,  3.0),
        vec3( 3.0,  10.0,  3.0),
        vec3( 3.0,  10.0, -3.0),
        
        // Bottom face
        vec3(-3.0, -10.0, -3.0),
        vec3( 3.0, -10.0, -3.0),
        vec3( 3.0, -10.0,  3.0),
        vec3(-3.0, -10.0,  3.0),
        
        // Right face
        vec3( 3.0, -10.0, -3.0),
        vec3( 3.0,  10.0, -3.0),
        vec3( 3.0,  10.0,  3.0),
        vec3( 3.0, -10.0,  3.0),
        
        // Left face
        vec3(-3.0, -10.0, -3.0),
        vec3(-3.0, -10.0,  3.0),
        vec3(-3.0,  10.0,  3.0),
        vec3(-3.0,  10.0, -3.0)

    ];

var cubeVertexIndices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,    // left

    24, 25, 26,     24, 26, 27,    // front
    28, 29, 30,     28, 30, 31,    // back
    32, 33, 34,     32, 34, 35,   // top
    36, 37, 38,     36, 38, 39,   // bottom
    40, 41, 42,     40, 42, 43,   // right
    44, 45, 46,     44, 46, 47    // left
]

function init()
{

    gl.viewport( 0, 0, g_canvas.width, g_canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    audioManager.set("waterflame-glorious-morning.mp3", "waterflame-glorious-morning.mp3");

    col = [g_images.blue, g_images.red, g_images.yellow, g_images.green, g_images.purple, g_images.bw];


    bufferHandler( program );

    u_imageLocation = gl.getUniformLocation(program, "texture");

    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

    var proj = perspective( 50.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));

    render();
}

function bufferHandler(program){

    vBuffer = gl.createBuffer() ;
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoords), gl.STATIC_DRAW );
    
    vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );

    iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(cubeVertexIndices), gl.STATIC_DRAW);

    gl.bindBuffer( gl.ARRAY_BUFFER, null );
}

function initTextures(src, num) {
  cubeTexture.push(gl.createTexture());
  cubeImage.push(new Image());
  cubeImage[num].onload = function() { handleTextureLoaded(cubeImage[num], cubeTexture[num]); }
  cubeImage[num].src = src;
}

function handleTextureLoaded(image, texture) {
  console.log("handleTextureLoaded, image = " + image);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

//----------------------------------------------------------------------------
// Define the transformation scale here (two scale functions in MV.js)
function scale4( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}

function drawCube(mv, color, x, y, z){
    mv = mult( mv, translate( x, y, z ) );

    gl.cullFace(gl.BACK);

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cubeTexture[color]);
    gl.uniform1i(u_imageLocation, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);

    gl.drawElements( gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, null );
}

function drawStage(mv){
    mv = mult( mv, translate( -2.5, -9.5, -2.5 ) );

    gl.cullFace(gl.FRONT);

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cubeTexture[0]);
    gl.uniform1i(u_imageLocation, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);

    gl.drawElements( gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 36 );

    gl.bindBuffer( gl.ARRAY_BUFFER, null );
}

function upRend(mv){
    if(block.length !== 0){
        block[0].update(timer);
        block[0].render(mv);
    }
    Map.render(mv);
}

var renderCrook = true;
function render()
{   
    document.getElementById("score").innerHTML = "Score: " + score;
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mvstack = [];
    

    var mv = lookAt( vec3(0.0, 0.0, zDist), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, translate( 2.5, 9.5, 2.5 ) );
    mv = mult( mv, rotate( parseFloat(spinX), [-1, 0, 0] ) );
    mv = mult( mv, rotate( parseFloat(spinY), [0, 1, 0] ) );

    drawStage(mv);
    
    if(eatKey('T'.charCodeAt(0))){
        renderCrook = !renderCrook;
    }
    if(eatKey('G'.charCodeAt(0))){
        gameMode = !gameMode;
    }

    if(eatKey('R'.charCodeAt(0))){
        console.log('yo');
        Map.mapReset();
        block.splice(0,1);
        score = 0;
    }

    if(score/100 < 15){
        var upSet = score / 100;
        numRenders = 15 - upSet;
    }

    if(Map._tiles[3][0][3] === 0){
        //To get uniformly distributed random numbers between min and max:
        //Math.floor(Math.random() * (max - min + 1)) + min;
        var blockDrop = Math.round(Math.random());
        var now = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        if(gameMode){
            if(eatKey(' '.charCodeAt(0))){
                if(renderCrook){
                    block.push(new Crook(
                        {   color: now, 
                            falling: true
                        }
                    ));
                }else{
                    block.push(new Line(
                        {   color: now, 
                            falling: true
                        }
                    ));
                }
            }
        } else{
            if(block.length === 0){
                if(blockDrop){
                    block.push(new Crook({
                        color: now,
                        falling: true
                    }));
                }else{
                    block.push(new Line({
                        color: now,
                        falling: true
                    }))
                }
            }
        }
    }

    if(++timer > numRenders){
        timer = 0;
    }
    upRend(mv);

    if(eatKey('M'.charCodeAt(0))){
        mute = !mute;
        if(mute){
            audioManager.muteAll();
        }else{
            audioManager.unmuteAll();
        }
    }
    playSong();

    if(eatKey('P'.charCodeAt(0))) debugger;

    requestAnimFrame( render );
}

function playSong() {
    var delay = 500; // ms
    setTimeout(function(){
        audioManager.playByID("waterflame-glorious-morning.mp3", 0.8, true);
    }, delay);
}

requestPreloads();