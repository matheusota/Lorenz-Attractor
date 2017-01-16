//some global variables
var x = 0.01;
var y = 0;
var z = 0;

var x2 = 0.02;
var y2 = 0;
var z2 = 0;

var a = 10;
var b = 28;
var c = 8.0 / 3.0;

var delta = 10;

var points = [[x, y, z]];
var points2 = [[x2, y2, z2]];

var sens = 0.01;
var it = 0;

var h1 = 185;
var h2 = 55;

//matrix to apply the rotations
var rotmatrix = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

var pause = false;

//this will run only at the start
function setup(){
  colorMode(HSB);
  createCanvas(1080, 720);
  background(0);
}

//this will run everytime
function draw(){
  //check for pressed keys
  if(keyIsPressed == true){
    if(keyCode == UP_ARROW)
      rotate3D(1, 0, 0, sens);
    else if(keyCode == DOWN_ARROW)
      rotate3D(-1, 0, 0, sens);
    else if(keyCode == LEFT_ARROW)
      rotate3D(0, 1, 0, sens);
    else if(keyCode == RIGHT_ARROW)
      rotate3D(0, -1, 0, sens);
    else if(keyCode == 32){
      if(!pause)
        pause = true;
      else
        pause = false;
    }
  }
  
  //clearing all
  clear();
  background(0);
  
  //add new points  
  //compute differentials(lorenz attractor)
  if(it < 10000 && !pause){
    var dt = 0.01;
    var dx = (a * (y - x)) * dt;
    var dy = (x * (b - z) - y) * dt;
    var dz = (x * y - c * z) * dt;
    
    x = x + dx;
    y = y + dy;
    z = z + dz;
    
    var dx2 = (a * (y2 - x2)) * dt;
    var dy2 = (x2 * (b - z2) - y2) * dt;
    var dz2 = (x2 * y2 - c * z2) * dt;
    
    x2 = x2 + dx2;
    y2 = y2 + dy2;
    z2 = z2 + dz2;
    
    //push new point to points array
    points.push([x, y, z])
    points2.push([x2, y2, z2])
    it = it + 1;
  }
    
   //draw every point in points array
    
  //set origin to center of figure
  translate(width / 2, height / 2);
  
  //var hu = 0;
  var result;
  for(var i = 0; i < points.length; i++){
    fill(h1, 200, 255);
    noStroke();
    result = math.multiply(points[i], rotmatrix).valueOf();
    ellipse(result[0] * delta, result[1] * delta, 5, 5);
    
    fill(h2, 255, 255);
    noStroke();
    result = math.multiply(points2[i], rotmatrix).valueOf();
    ellipse(result[0] * delta, result[1] * delta, 5, 5);
    //hu = hu + 0.1
    //if(hu > 255)
      //hu = 0;
  }
}

//function to rotate
function rotate3D(x, y, z, theta){
  d = math.multiply([x, y, z], math.transpose(rotmatrix)).valueOf();
  u = d[0];
  v = d[1];
  w = d[2];
  c = cos(theta);
  s = sin(theta);
  C = 1 - c;
  
  var update_rot = math.matrix([
      [sq(u) * C + c, u * v * C - w * s, u * w * C + v * s],
      [u * v * C + w * s, sq(v) * C + c,v * w * C - u * s],
      [u * w * C - v * s, v * w * C + u * s, sq(w) * C + c]
    ]);
    
  rotmatrix = math.multiply(update_rot, rotmatrix);
}