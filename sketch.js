let vs = []
function setup() {
 
  createCanvas(400, 400);
  v = new Vehicle(300,100);

}

function draw() {
  background(0,0,100);
  
  
  
  v.display()
  v.edges()
  v.update();
  v.wander();
  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30;
    this.maxspeed = 1.5;
    this.maxforce = 0.01;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug = true;
    
    if (debug){
      push()
      fill(255, 0, 0);
      stroke('white')
      stroke('white');
      noFill();
      stroke('white');
      stroke('white')

  fill(44, 44, 43)
  strokeJoin(ROUND)
  strokeWeight(1)
  ellipse(projPoint.x+100,projPoint.y+100,150,150);
  fill(255,255,255)
  ellipse(projPoint.x+110,projPoint.y+80,80,80);
  fill(44, 44, 43)
  ellipse(projPoint.x+110,projPoint.y+90,40,40);
  fill(44, 44, 43)
  ellipse(projPoint.x+110, projPoint.y+65,40,40);
  fill(255,255,255)
  ellipse(projPoint.x+110,projPoint.y+90,27.5,27.5);
  fill(255,255,255)
  ellipse(projPoint.x+110,projPoint.y+62,23.5,23.5);

      pop()
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.5, 0.5);
  }
  
  seek(vektorTarget){
    // percieve target location 
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    noStroke();
    translate(this.location.x, this.location.y)
    rotate(theta)
    fill('green')
    triangle(0, this.l/2, 0, -this.l/2, this.l,0)
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }
}