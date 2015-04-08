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

var cubePos = 0;
var stageCoords = 1;

var tBuffer = [];
var vBuffer = [];
var vPosition = [];
var vTexCoord = [];


var textures = [];

var zDist = -30.0;
var timer = 0;
var numRenders = 5;


var block = [];
var col = [];

var proLoc;
var mvLoc;

var g_images = {};

function requestPreloads() {

    var requiredImages = {
    blue     : "blue.png",
    red      : "red.png",
    green    : "green.png",
    yellow   : "yellow.png",
    purple   : "purple.png",
    bw       : "bw.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

function preloadDone() {


    init();
}




function init()
{

    gl.viewport( 0, 0, g_canvas.width, g_canvas.height );
    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    //textureHandle();
    col = [g_images.blue, g_images.red, g_images.yellow, g_images.green, g_images.purple, g_images.bw];


    colorCube(cubePos);
    bufferHandler(cubePos, program);

    colorStage(stageCoords);
    bufferHandler(stageCoords, program);
    console.log(texCoords);

    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

    var proj = perspective( 50.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));

    render();
}

var indices = [11, 8, 12, 11, 12, 15,
               9, 8, 11, 9, 11, 10,
              13, 12, 8, 13, 8, 9,
              14, 15, 12, 14, 12, 13,
              10, 11, 15, 10, 15, 14,
              13, 9, 10, 13, 10, 14];

function bufferHandler(bC, program){

    vBuffer.push( gl.createBuffer()) ;
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer[bC] );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points[bC]), gl.STATIC_DRAW );
    
    vPosition.push( gl.getAttribLocation( program, "vPosition" ));
    gl.vertexAttribPointer( vPosition[bC], 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition[bC] );
    
    tBuffer.push( gl.createBuffer() );
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer[bC] );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoords[bC]), gl.STATIC_DRAW );
    
    vTexCoord.push( gl.getAttribLocation( program, "vTexCoord" ) );
    gl.vertexAttribPointer( vTexCoord[bC], 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord[bC] );

    gl.bindBuffer( gl.ARRAY_BUFFER, null );
}

function configureTexture( image ) {
    texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
    
}

function colorCube(numb)
{
    points[numb] = [];
    texCoords[numb] = [];

    quad( 3, 0, 4, 7, numb );
    quad( 1, 0, 3, 2, numb );
    quad( 5, 4, 0, 1, numb );
    quad( 6, 7, 4, 5, numb );
    quad( 2, 3, 7, 6, numb );
    quad( 5, 1, 2, 6, numb );

}

function colorStage(numb)
{
    points[numb] = [];
    texCoords[numb] = [];

    quad( 11,  8, 12, 15, numb );
    quad(  9,  8, 11, 10, numb );
    quad( 13, 12,  8,  9, numb );
    quad( 14, 15, 12, 13, numb );
    quad( 10, 11, 15, 14, numb );
    quad( 13,  9, 10, 14, numb );
}
var vertices = [];

function quad(a, b, c, d, numb) 
{

    vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ), //0 cube
        vec4( -0.5,  0.5,  0.5, 1.0 ), //1
        vec4(  0.5,  0.5,  0.5, 1.0 ), //2
        vec4(  0.5, -0.5,  0.5, 1.0 ), //3
        vec4( -0.5, -0.5, -0.5, 1.0 ), //4
        vec4( -0.5,  0.5, -0.5, 1.0 ), //5
        vec4(  0.5,  0.5, -0.5, 1.0 ), //6
        vec4(  0.5, -0.5, -0.5, 1.0 ), //7
        vec4( -3.0, -10.0,  3.0, 1.0 ), //8 stage
        vec4( -3.0,  10.0,  3.0, 1.0 ), //9
        vec4(  3.0,  10.0,  3.0, 1.0 ), //10
        vec4(  3.0, -10.0,  3.0, 1.0 ), //11
        vec4( -3.0, -10.0, -3.0, 1.0 ), //12
        vec4( -3.0,  10.0, -3.0, 1.0 ), //13
        vec4(  3.0,  10.0, -3.0, 1.0 ), //14
        vec4(  3.0, -10.0, -3.0, 1.0 ), //15
    ];

    var texCo = [
        vec2(0, 0),  //0
        vec2(0, 1),  //1
        vec2(1, 0),  //2
        vec2(1, 1),  //3
        vec2(0, 0),  //4 top
        vec2(0, 6),  //5
        vec2(6, 0),  //6
        vec2(6, 6),  //7
        vec2(0, 0),  //8 sides
        vec2(0, 20), //9
        vec2(6, 0), //10
        vec2(6, 20) //11
    ];

    //vertex texture coordinates assigned by the index of the vertex
    var indices = [ a, b, c, a, c, d ];
    if(numb !== 1){
        var texind  = [ 2, 3, 1, 2, 1, 0 ];
    }else if( a === 11 || (a === 13 && b===9)){
        var texind = [ 6, 7, 5, 6, 5, 4 ];
    }else{
        var texind  = [ 10, 11, 9, 10, 9, 8 ];
    }

    for ( var i = 0; i < indices.length; ++i ) {
        points[numb].push( vertices[indices[i]] );
        texCoords[numb].push( texCo[texind[i]] );
    }
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
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer[cubePos] );
    gl.vertexAttribPointer( vTexCoord[cubePos], 2, gl.FLOAT, false, 0, 0 );
    configureTexture( color );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer[cubePos] );
    gl.vertexAttribPointer( vPosition[cubePos], 4, gl.FLOAT, false, 0, 0 );

    
    gl.drawArrays( gl.TRIANGLES, 0, 36 );

    gl.bindBuffer( gl.ARRAY_BUFFER, null );
}

function drawStage(mv, color){
    mv = mult( mv, translate( -2.5, -9.5, -2.5 ) );

    gl.cullFace(gl.FRONT);

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer[stageCoords] );
    gl.vertexAttribPointer( vTexCoord[stageCoords], 2, gl.FLOAT, false, 0, 0 );
    configureTexture( color );
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer[stageCoords] );
    gl.vertexAttribPointer( vPosition[stageCoords], 4, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLES, 0, 36 );

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
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mvstack = [];
    

    var mv = lookAt( vec3(0.0, 0.0, zDist), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, translate( 2.5, 8.5, 2.5 ) );
    mv = mult( mv, rotate( parseFloat(spinX), [-1, 0, 0] ) );
    mv = mult( mv, rotate( parseFloat(spinY), [0, 1, 0] ) );

    drawStage(mv, col[5]);
    
    if(eatKey('T'.charCodeAt(0))){
        renderCrook = !renderCrook;
    }
    var now = Math.round(Math.random() * 4);
    if(eatKey(' '.charCodeAt(0))){
        if(renderCrook){
            block.push(new Crook(
                {   color: col[now], 
                    falling: true
                }
            ));
        }else{
            block.push(new Line(
                {   cx: 0.0,
                    cy: 0.0,
                    cz: 0.0, 
                    color: col[now], 
                    falling: true
                }
            ));
        }
    }

    if(++timer > numRenders){
        timer = 0;
    }
    upRend(mv);

    if(eatKey('P'.charCodeAt(0))) debugger;

    requestAnimFrame( render );
}


requestPreloads();