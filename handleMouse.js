// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

function handleMouseDown(evt) {
    
    movement = true;
    origX = evt.offsetX;
    origY = evt.offsetY;
    
    // If no button is being pressed, then bail
    if (!evt.which) return;
}

function handleMouseUp(evt){
    movement = false;
}

function handleMouseMove(evt) {
    if(movement) {
            spinY = ( spinY - (origX - evt.offsetX) ) % 360;
            spinX = ( spinX - (origY - evt.offsetY) ) % 360;
            origX = evt.offsetX;
            origY = evt.offsetY;
        }
}

function handleMouseWheel(evt) {
    evt.preventDefault();
         if( evt.wheelDelta > 0.0 ) {
             zDist += 1.0;
         } else {
             zDist -= 1.0;
         }
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("mousewheel", handleMouseWheel);