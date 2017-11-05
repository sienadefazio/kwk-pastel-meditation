// Spring drawing constants for top bar
var springHeight = 32,
    left,
    right,
    maxHeight = 300,
    minHeight = 0,
    over = false,
    move = false;
var x; //center for shape
var y;
var numPoints = 6


var angle = 0;
var angleStep = 180.0 / numPoints;
var outsideRadius = 150;
var insideRadius = 100;
// Spring simulation constants
var M = 1.5, // Mass
    K = 0.001, // Spring constant
    D = 1, // Damping
    R = 300; // Rest position


// Spring simulation variables
var ps = R, // Position
    vs = 0.0, // Velocity
    as = 0, // Acceleration
    f = 0; // Force
var cx = 240
var cy = 130
var cz = 130
var ca = cx
var cb = cy
var cd = cz
function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CORNERS);
    noStroke();
    left = width / 2 - 100;
    right = width / 2 + 100;
    x = width / 2; //centers shape
    y = height / 2;
}



function draw() {

    background(204);
    updateSpring();
    drawSpring();


}

function drawSpring() {
    // Draw base


    fill(cx, cy, cz)


  


    var baseWidth = 2 * ps + 50;
    if (baseWidth > windowWidth/2){
        ca = 204
        cb = 204
        cd = 204
    }
    else {
        ca = cx
        cb = cy
        cd = cz
    }
    rect(0, 0, baseWidth, height);
   
    fill(ca, cb, cd)
    numPoints = Math.floor(map(ps,minHeight,maxHeight,2,10))
    angleStep = 180.0 / numPoints
    console.log(numPoints)
    beginShape(TRIANGLE_STRIP);
    for (var i = 0; i <= numPoints; i++) {
        var px = x + cos(radians(angle)) * outsideRadius;
        var py = y + sin(radians(angle)) * outsideRadius;
        angle += angleStep;
        vertex(px, py);
        px = x + cos(radians(angle)) * insideRadius;
        py = y + sin(radians(angle)) * insideRadius;
        vertex(px, py);
        angle += angleStep;
    }
    endShape();
    // Set color and draw top bar
    if (over || move) {
        fill(255);
    }
    else {
        fill(204);
        
    }

    rect(left, ps, right, ps + springHeight);
    

}

function updateSpring() {
    // Update the spring position
    if (!move && !over) {
        f = -K * (ps - R); // f=-ky
        as = f / M; // Set the acceleration, f=ma == a=f/m
        vs = D * (vs + as); // Set the velocity
        ps = ps + vs; // Updated position
        
    }

    if (abs(vs) < 0.1) {
        vs = 0.0;
    }

    // Test if mouse if over the top bar
    if (mouseX > left && mouseX < right && mouseY > ps && mouseY < ps + springHeight) {
        over = true;
    }
    else {
        over = false;
    }

    // Set and constrain the position of top bar
    if (move) {
        ps = mouseY - springHeight / 2;
        ps = constrain(ps, minHeight, maxHeight);
        
    }

        if (vs<0 && vs>-5) {// makes random colors at each end
        cx = random(130, 255)
        cy = random(130, 255)
        cz = random(130, 255)
        // cx = cx + 10 
        // cy = cy + 10
        // cz = cz + 10
    }

    
}

function mousePressed() {
    if (over) {
        move = true;
    }
}

function mouseReleased() {
    move = false;
    springHeight = 0 //makes rectangle disappear after pressed
}
// if (ps = 300){
//     c = c + 10
//  }
